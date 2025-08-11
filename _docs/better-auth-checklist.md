### Better Auth: Remaining Work Checklist

Use this checklist to finish the Better Auth integration and polish the developer experience.

- [ ] Email verification flow

  - [x] Configure SMTP for development (Nodemailer + Ethereal)
    - Credentials stored locally in `.env` (do not commit); placeholders added to `.env.example`
    - Reference: Ethereal docs (`https://ethereal.email/`, `https://ethereal.email/faq`)
  - [x] Add `.env.example` placeholders for SMTP (Ethereal) keys
  - [x] Install `nodemailer` dependency
  - [x] Wire up Better Auth email verification hooks (send + verify)
  - [ ] Issue verification tokens using `verification` table (server)
        (Better Auth handles tokens internally; keep for custom flows if needed)
  - [x] Send verification email (Nodemailer via Ethereal)
  - [x] Add verification callback route (marks `user.emailVerified = true`)
  - [x] UI prompt and action to resend verification email for unverified users (Dashboard)

- [ ] Password reset flow

  - [x] Add `pages/auth/forgot-password.vue` (request reset)
  - [x] Add `pages/auth/reset.vue` (query token); remove path token page (use built-in redirect/links)
  - [x] Use Better Auth endpoints to create/consume reset tokens
  - [x] Link “Forgot password?” from `components/auth/AuthLoginForm.vue`

- [ ] Social/OAuth providers (Google)

  - [x] Add providers in `lib/auth.ts` and configure env keys
  - [x] Add provider buttons in `components/auth/AuthLoginForm.vue` and `AuthSignupForm.vue`
  - [x] Update `.env.example` with provider keys
  - [x] Add keys to `lib/env/index.ts`
  - [x] Sync `.env` placeholders for Google keys
  - [ ] Add notes in `README.md`

- [ ] General auth middleware

  - [ ] Create `middleware/auth.ts` to protect authenticated-only routes
  - [ ] Apply to pages beyond admin (e.g., `pages/dashboard.vue`)
  - [ ] (Optional) `middleware/email-verified.ts` to require verified email

- [x] Home page updates (show Better Auth in feature cards)

  - [x] Update `pages/index.vue` to add a `ShadowCard` for Better Auth
    - Implemented with `shadow-color="amber-500"`, icon `lucide:key-round`, short blurb
  - [ ] Add quick links to Admin demo (`/users`) when `user.admin === true`

- [ ] README updates (document Better Auth)

  - [ ] Add section covering: features, flows (login/signup/logout, session, admin), SSR cookie forwarding, and routes
  - [ ] Add environment variables and production guidance (`BETTER_AUTH_URL`, secrets)
  - [ ] Add local testing steps and seed instructions; reference `scripts/docs/test-credentials.md`

- [ ] Environment variable consistency

  - [ ] Ensure `.env.example`, `.env`, and `lib/env/index.ts` include all Better Auth and provider keys (names match exactly)
  - [ ] Add production notes (set `BETTER_AUTH_URL=https://your-domain`)

- [ ] Production hardening

  - [ ] Configure secure cookie flags in Better Auth for production (secure, sameSite, domain)
  - [ ] Ensure `baseURL` is correct in prod (`https://…`); set `trust proxy` if behind a proxy
  - [ ] Review session lifetime/rotation defaults; tighten if needed

- [ ] UX polish

  - [ ] Add “Resend verification email” action for unverified accounts
  - [ ] Improve error toasts/messages for auth failures
  - [ ] Loading/disabled states for all auth actions

- [ ] Testing

  - [ ] Add E2E tests (Playwright) for login/signup/logout and admin gating
  - [ ] Add tests for email verification and password reset flows
  - [ ] Add API integration tests for `server/api/auth/[...all].ts` happy/edge cases

- [ ] Seed and cleanup scripts for auth tables

  - [x] Update cleanup script to clear `verification`, `account`, `session`, `user` in safe order
  - [x] Ensure seeding uses Better Auth API and sets `admin` flag reliably
  - [ ] Add Google OAuth seeded test path (optional: document manual steps)

- [ ] Documentation in `_docs/`
  - [ ] Write short design docs for Email Verification and Password Reset flows
  - [ ] Document provider setup steps (GitHub/Google) with required env keys
