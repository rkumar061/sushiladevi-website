# Susheeladevi College CMS

This application is intended for a persistent Node.js VPS, not ephemeral/serverless hosting.

## Setup

1. Copy `.env.example` to `.env.local` and set strong bootstrap credentials.
2. Run `npm install` and `npm run cms:migrate`.
3. Run `npm run cms:bootstrap` once to create the first administrator.
4. Remove the `CMS_BOOTSTRAP_*` variables.
5. Open `/admin/login`, sign in, and replace the temporary password in Account settings.

## Persistent paths

- SQLite: `CMS_DATABASE_PATH` (default `data/cms.sqlite`)
- Uploads: `CMS_UPLOAD_DIR` (default `storage/uploads`)
- Backups: `CMS_BACKUP_DIR` (default `backups`)
- Lead rate-limit privacy salt: `CMS_IP_HASH_SALT` (set a long random production value)

Mount the database and uploads paths on persistent VPS volumes. Back them up together with `npm run cms:backup`; it uses SQLite's online backup API before copying uploads.

## Commands

```bash
npm run cms:migrate
npm run cms:bootstrap
npm run cms:backup
npm run typecheck
npm run lint
npm test
npm run build
```

The original `src/data/siteData.ts` remains the idempotent first seed and emergency fallback. Existing database documents are never overwritten by later seeds.

## Leads and roles

Every admission dialog, contact-page, and footer enquiry collects student name, parent name, student mobile, parent mobile, city, and message. Responses are stored in the local `leads` table and managed from `/admin/leads`. Administrators can manage the full CMS and create users. Users with the `admission_staff` role are restricted to Leads and their own account settings. Lead statuses are New, Contacted, Qualified, Admitted, and Closed; staff can search by any response field, filter, update status, and maintain internal notes. Historical leads using the earlier form structure remain readable.
