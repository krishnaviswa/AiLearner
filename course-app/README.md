# AI Engineering Dojo (hosted portal)

Review notes for tomorrow: [`REVIEW.md`](REVIEW.md).

A [Tutorials Dojo](https://tutorialsdojo.com/)-style product around this lab: public catalog, enroll, then an in-browser reader.

The parent repo’s `.html` / `.md` files are **not** mounted as a website. The Node server reads one lesson file per authenticated `/api/lesson` call and returns HTML. Visitors only receive the SPA shell until they enroll.

## What this can and cannot do

A browser cannot truly stop a determined buyer from capturing text. DevTools, OCR, and screenshots still work. That is also true of every hosted course site.

This app does the same job Tutorials Dojo / Skill Builder do in practice:

- Do not publish a zip of the course.
- Do not serve lesson files as static URLs.
- Require pay or an access key.
- Watermark the reader with the buyer’s email.
- Block select, copy, right-click, Save, Print, and View Source shortcuts on the lesson.

Screenshots remain possible (you asked for that). Legal terms still matter more than the JavaScript lock.

**If the GitHub repo stays public with generated HTML, people can clone the files and skip this portal.** Make the repo private, or deploy only `course-app/` after packing, and do not host the numbered folders on GitHub Pages.

## Run locally

From `course-app/`:

```
copy .env.example .env
npm install
npm start
```

Open `http://127.0.0.1:8767/`. Unlock with the email you want watermarked and access key `dev-local-unlock` (from `.env.example`).

Do not use port 8000. The authoring lab on 8766 can stay up; this portal is 8767.

## Publish for a fee

1. Set `COURSE_PRICE_CENTS` and `COURSE_PRICE_LABEL` to **your** fee.
2. Add Stripe keys. Restart. The enroll page shows **Pay and open the portal**.
3. Deploy this Node app (Render, Fly, Railway, a VPS). Start command: `npm start`. Keep the parent repo next to `course-app/` so lessons can be read from disk. Optional: `npm run pack` if you later split a private lesson store.
4. Set `PUBLIC_URL` to the public https origin and a long `SESSION_SECRET`.
5. Remove `LICENSE_KEYS` in production unless you mint keys by hand.

Markdown remains the source of truth in the parent repo. Re-run `python app/tools/render-pages.py` then `npm run pack` when curriculum changes.
