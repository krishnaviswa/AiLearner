/**
 * Pack generated lesson HTML into course-app/private (not web-root).
 * Markdown stays the authoring source in the parent repo.
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(__dirname, "private");

export function loadLearnPath() {
  const code = fs.readFileSync(path.join(ROOT, "app/js/learn-path.js"), "utf8");
  const ctx = {
    window: { location: { pathname: "/index.html" } },
    document: { title: "" },
  };
  vm.runInNewContext(code, ctx);
  if (!ctx.window.LabPath) throw new Error("learn-path.js did not set LabPath");
  return ctx.window.LabPath;
}

export function loadPageIndex() {
  const file = path.join(ROOT, "app/js/page-index.js");
  if (!fs.existsSync(file)) return {};
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(file, "utf8"), ctx);
  return ctx.window.LAB_PAGE_INDEX || {};
}

function lessonId(href) {
  return String(href).replace(/\.html$/i, "");
}

export function extractArticle(html) {
  const m = html.match(/<article class="lab-article">([\s\S]*?)<\/article>/i);
  return m ? m[1] : null;
}

function rewriteHref(url, folder) {
  if (/^(https?:|mailto:|javascript:)/i.test(url)) return url;
  if (url.startsWith("#/") || url === "#") return url;
  if (url.startsWith("#")) return url;
  const pathPart = url.split("#")[0].split("?")[0];
  if (!pathPart) return url;
  let dest = pathPart;
  if (dest.startsWith("../")) dest = dest.replace(/^\.\.\//, "");
  else if (!dest.startsWith("/") && folder) dest = folder + "/" + dest;
  dest = dest.replace(/^\//, "").replace(/\.html$/i, "");
  if (!dest || dest === "index") dest = "index";
  return "#/learn/" + dest;
}

export function cleanArticle(html, folder) {
  let out = html;
  out = out.replace(/<script[\s\S]*?<\/script>/gi, "");
  out = out.replace(/<p class="md-source">[\s\S]*?<\/p>/i, "");
  out = out.replace(/\bhref="([^"]+)"/g, (full, url) => `href="${rewriteHref(url, folder)}"`);
  return out.trim();
}

export function packContent() {
  const pathApi = loadLearnPath();
  const pageIndex = loadPageIndex();
  const lessonsDir = path.join(OUT, "lessons");
  fs.rmSync(lessonsDir, { recursive: true, force: true });
  fs.mkdirSync(lessonsDir, { recursive: true });

  const lessons = [];
  for (const item of pathApi.lessons) {
    const file = path.join(ROOT, item.href.replace(/\//g, path.sep));
    if (!fs.existsSync(file)) {
      console.warn("skip missing", item.href);
      continue;
    }
    const article = extractArticle(fs.readFileSync(file, "utf8"));
    if (!article) {
      console.warn("skip no article", item.href);
      continue;
    }
    const id = lessonId(item.href);
    const folder = item.folder || "";
    const rec = {
      id,
      title: item.title,
      module: item.module,
      folder,
      section: item.section,
      html: cleanArticle(article, folder),
    };
    const safe = id.replace(/[\\/]/g, "--");
    fs.writeFileSync(path.join(lessonsDir, safe + ".json"), JSON.stringify(rec));
    lessons.push({
      id,
      title: item.title,
      module: item.module,
      folder,
      section: item.section,
    });
  }

  const catalog = {
    packedAt: new Date().toISOString(),
    modules: pathApi.modules,
    lessons,
    pagesByFolder: pageIndex,
  };
  fs.writeFileSync(path.join(OUT, "catalog.json"), JSON.stringify(catalog, null, 2));
  console.log("packed", lessons.length, "lessons →", OUT);
  return catalog;
}

function ranDirectly() {
  try {
    return path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
  } catch {
    return false;
  }
}

if (ranDirectly()) packContent();
