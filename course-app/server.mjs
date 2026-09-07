/**
 * Hosted course portal. Serves only the SPA shell + authenticated APIs.
 * Curriculum Markdown/HTML in the parent repo is never mounted as static files.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import express from "express";
import cookieParser from "cookie-parser";
import {
  loadLearnPath,
  loadPageIndex,
  extractArticle,
  cleanArticle,
} from "./pack-content.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(__dirname, "data");
const PUBLIC = path.join(__dirname, "public");
const COOKIE = "dojo_session";

function loadEnvFile() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 1) continue;
    const k = t.slice(0, i).trim();
    const v = t.slice(i + 1).trim();
    if (process.env[k] == null) process.env[k] = v;
  }
}

loadEnvFile();

const PORT = Number(process.env.PORT || 8767);
const BIND = process.env.BIND || "127.0.0.1";
const SECRET = process.env.SESSION_SECRET || "dev-only-change-me";
const TITLE = process.env.COURSE_TITLE || "AI Engineering Dojo";
const PRICE_CENTS = Number(process.env.COURSE_PRICE_CENTS || 0);
const PRICE_LABEL = process.env.COURSE_PRICE_LABEL || "";
const LICENSE_KEYS = new Set(
  String(process.env.LICENSE_KEYS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
);
const PUBLIC_URL = (process.env.PUBLIC_URL || `http://${BIND}:${PORT}`).replace(/\/$/, "");

function b64url(buf) {
  return Buffer.from(buf).toString("base64url");
}

function sign(payload) {
  const body = b64url(JSON.stringify(payload));
  const sig = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function verify(token) {
  if (!token || typeof token !== "string") return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expect = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expect);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!data.exp || Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

function buildCatalog() {
  const pathApi = loadLearnPath();
  const lessons = pathApi.lessons.map((item) => ({
    id: String(item.href).replace(/\.html$/i, ""),
    title: item.title,
    module: item.module,
    folder: item.folder || "",
    section: item.section,
  }));
  return {
    modules: pathApi.modules,
    lessons,
    pagesByFolder: loadPageIndex(),
  };
}

const catalog = buildCatalog();

function safeLessonId(id) {
  if (!id || typeof id !== "string") return null;
  const clean = id.replace(/\.html$/i, "").replace(/\\/g, "/");
  if (clean.includes("..") || !/^[A-Za-z0-9._/-]+$/.test(clean)) return null;
  return clean;
}

function readLesson(id) {
  const meta = catalog.lessons.find((l) => l.id === id);
  if (!meta) return null;
  const rel = id === "index" ? "index.html" : `${id}.html`;
  const file = path.resolve(ROOT, ...rel.split("/"));
  const relToRoot = path.relative(ROOT, file);
  if (!relToRoot || relToRoot.startsWith("..") || path.isAbsolute(relToRoot)) return null;
  if (!fs.existsSync(file)) return null;
  const article = extractArticle(fs.readFileSync(file, "utf8"));
  if (!article) return null;
  return {
    ...meta,
    html: cleanArticle(article, meta.folder),
  };
}

function entitlementsPath() {
  fs.mkdirSync(DATA, { recursive: true });
  return path.join(DATA, "entitlements.json");
}

function readEntitlements() {
  const p = entitlementsPath();
  if (!fs.existsSync(p)) return { emails: {} };
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return { emails: {} };
  }
}

function grantEmail(email) {
  const db = readEntitlements();
  db.emails[email.toLowerCase()] = { paidAt: new Date().toISOString() };
  fs.writeFileSync(entitlementsPath(), JSON.stringify(db, null, 2));
}

function setSession(res, email) {
  const token = sign({
    email,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 365,
  });
  res.cookie(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 365,
    path: "/",
  });
}

function requireSession(req, res, next) {
  const sess = verify(req.cookies[COOKIE]);
  if (!sess) return res.status(401).json({ error: "Sign in to open lessons." });
  req.session = sess;
  next();
}

const lessonHits = new Map();
function rateLimitLesson(req, res, next) {
  const key = req.session?.email || req.ip;
  const now = Date.now();
  const row = lessonHits.get(key) || [];
  const recent = row.filter((t) => now - t < 60_000);
  recent.push(now);
  lessonHits.set(key, recent);
  if (recent.length > 90) {
    return res.status(429).json({ error: "Too many lesson loads. Slow down." });
  }
  next();
}

const app = express();
app.disable("x-powered-by");
app.use(cookieParser());
app.use(express.json({ limit: "32kb" }));
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "same-origin");
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.get("/api/config", (_req, res) => {
  res.json({
    title: TITLE,
    priceCents: PRICE_CENTS || null,
    priceLabel: PRICE_LABEL || null,
    stripeEnabled: Boolean(process.env.STRIPE_SECRET_KEY),
    lessonCount: catalog.lessons.length,
    moduleCount: catalog.modules.length,
  });
});

app.get("/api/preview", (_req, res) => {
  res.json({
    modules: catalog.modules,
    lessons: catalog.lessons,
  });
});

app.get("/api/session", (req, res) => {
  const sess = verify(req.cookies[COOKIE]);
  if (!sess) return res.json({ ok: false });
  res.json({ ok: true, email: sess.email });
});

app.post("/api/unlock", (req, res) => {
  const key = String(req.body?.key || "").trim();
  const email = String(req.body?.email || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Enter the email we should watermark." });
  }
  if (!LICENSE_KEYS.has(key)) {
    return res.status(403).json({ error: "That access key is not valid." });
  }
  grantEmail(email);
  setSession(res, email);
  res.json({ ok: true, email });
});

app.post("/api/logout", (req, res) => {
  res.clearCookie(COOKIE, { path: "/" });
  res.json({ ok: true });
});

app.post("/api/checkout", async (req, res) => {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return res.status(400).json({ error: "Card checkout is not configured." });
  const email = String(req.body?.email || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Enter an email for the receipt and watermark." });
  }
  if (!PRICE_CENTS || PRICE_CENTS < 50) {
    return res.status(400).json({ error: "Set COURSE_PRICE_CENTS (minimum 50)." });
  }
  const stripe = (await import("stripe")).default;
  const client = new stripe(secret);
  const session = await client.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    success_url: `${PUBLIC_URL}/api/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${PUBLIC_URL}/#/enroll`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: PRICE_CENTS,
          product_data: {
            name: TITLE,
            description: "One-time access to the hosted AI Engineering path. Browser learning only.",
          },
        },
      },
    ],
  });
  res.json({ url: session.url });
});

app.get("/api/checkout/success", async (req, res) => {
  const secret = process.env.STRIPE_SECRET_KEY;
  const id = String(req.query.session_id || "");
  if (!secret || !id) return res.redirect("/#/enroll");
  try {
    const stripe = (await import("stripe")).default;
    const client = new stripe(secret);
    const session = await client.checkout.sessions.retrieve(id);
    if (session.payment_status !== "paid") return res.redirect("/#/enroll");
    const email = String(session.customer_email || session.customer_details?.email || "").toLowerCase();
    if (!email) return res.redirect("/#/enroll");
    grantEmail(email);
    setSession(res, email);
    res.redirect("/#/learn");
  } catch {
    res.redirect("/#/enroll");
  }
});

app.get("/api/catalog", requireSession, (_req, res) => {
  res.json(catalog);
});

app.get("/api/lesson", requireSession, rateLimitLesson, (req, res) => {
  const id = safeLessonId(String(req.query.id || ""));
  if (!id) return res.status(400).json({ error: "Bad lesson id." });
  const lesson = readLesson(id);
  if (!lesson) return res.status(404).json({ error: "Lesson not found." });
  res.json({
    id: lesson.id,
    title: lesson.title,
    module: lesson.module,
    folder: lesson.folder,
    section: lesson.section,
    html: lesson.html,
    watermark: req.session.email,
  });
});

app.use(express.static(PUBLIC, { index: "index.html", extensions: ["html"] }));

app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ error: "Not found." });
  res.sendFile(path.join(PUBLIC, "index.html"));
});

app.listen(PORT, BIND, () => {
  console.log(`${TITLE} → http://${BIND}:${PORT}/`);
  console.log("Lessons are API-gated. Parent repo HTML is not served.");
});
