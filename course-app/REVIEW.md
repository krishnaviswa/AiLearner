# Review this tomorrow

Branch: `feat/ai-engineering-dojo`  
Product: hosted portal in `course-app/` (Tutorials Dojo pattern: catalog → enroll → in-browser reader).

## Run

```
cd course-app
copy .env.example .env
npm install
npm start
```

Open http://127.0.0.1:8767/

Unlock with any email + access key `dev-local-unlock`.

The authoring lab on **8766** is unchanged. This portal is **8767**. Do not use 8000.

## Click through

1. Home — hero, how it works, tracks. Verified.
2. Course path — titles only (public). Verified.
3. Enroll — email + key `dev-local-unlock`. After unlock, you land on the lesson you clicked.
4. Portal — navy outline, pills, previous/next, progress, email watermark.
5. Try select / copy / right-click / Ctrl+P on a lesson. Those are blocked. Screenshot still works.
6. Sign out.

Lesson API without a session returns `Sign in to open lessons.` Verified. I did not complete the key unlock in the browser (left that for you).

## Honest limit

A paid session can still use DevTools. This is the same class of protection as other hosted course sites. The real control is: **do not publish the numbered HTML folders**. Keep this repo private or deploy only `course-app/` after pack.

## Your fee

Set `COURSE_PRICE_CENTS` and `COURSE_PRICE_LABEL` in `course-app/.env`. Add Stripe keys when you want card checkout.
