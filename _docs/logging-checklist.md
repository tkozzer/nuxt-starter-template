### Logging Checklist (Nuxt 3 + Nitro + Pino + debug)

Refs: [Pino (Node logger)](https://getpino.io/), [pino-http (HTTP middleware)](https://github.com/pinojs/pino-http), [Nuxt/Nitro hooks](https://nitro.unjs.io/guide/internals/hooks), [debug (browser + node)](https://github.com/debug-js/debug)

Branch: `feat/logging`

---

#### 0) Pre-flight

- [x] Use `pnpm` for all commands
- [x] Confirm branch is `feat/logging`
- [x] Do not put custom components in `components/ui/` (shadcn-only)

#### 1) Dependencies

- [x] Install server logging deps
  - `pnpm add pino pino-http`
  - `pnpm add -D pino-pretty`
- [x] Install client debug logger
  - `pnpm add debug`

#### 2) Environment variables (schema + examples)

- [x] Add the following to `.env.example` (with comments and sensible defaults):
  - `LOG_LEVEL=info` (trace|debug|info|warn|error|fatal)
  - `LOG_PRETTY=true` (enable pretty printing locally; set false in prod)
  - `LOG_REQUESTS=true` (HTTP request/response logging toggle)
  - `LOG_REDACT=["headers.authorization","headers.cookie","body.password","body.token"]` (JSON array of redaction paths)
  - `NUXT_PUBLIC_DEBUG=app:*,feature:*` (default debug namespaces for browser)
- [x] Update `lib/env/index.ts` Zod schema with matching keys and types
  - `LOG_LEVEL: z.enum(["trace","debug","info","warn","error","fatal"])`
  - `LOG_PRETTY: z.boolean().default(false)`
  - `LOG_REQUESTS: z.boolean().default(true)`
  - `LOG_REDACT: z.string().transform(JSON.parse).default("[]")`
  - `NUXT_PUBLIC_DEBUG: z.string().default("")`
- [x] Ensure `.env` mirrors `.env.example` structure/comments; fill actual values
- [x] Run consistency checker: `pnpm run env:check`

#### 3) Server logger foundation (Pino)

- [x] Create `lib/logger/server.ts`
  - Build a singleton Pino instance using env (`LOG_LEVEL`, `LOG_PRETTY`, `LOG_REDACT`)
  - Configure redaction for secrets and cookies
  - Export helpers: `getServerLogger()` and `createChildLogger(bindings)`
- [x] Add `server/middleware/logger.global.ts`
  - On each request, generate or propagate `x-request-id` and attach `event.context.logger = createChildLogger({ requestId, path, method })`
  - Echo `x-request-id` header in the response
- [x] Add `server/types/h3.d.ts` to augment `H3EventContext` with `logger: Logger` type

#### 4) HTTP request/response logging

- [x] Implement `server/middleware/request-logger.global.ts` (or integrate `pino-http`)
  - On request start: log method, path, query, requestId
  - On response end: log status, duration, bytes, requestId
  - Respect `LOG_REQUESTS` (no-op when false)
  - Avoid logging large bodies; never log redacted fields

#### 5) Server error logging

- [x] Create `server/plugins/error-logger.ts`
  - Hook Nitro errors (e.g., `nitroApp.hooks.hook('error', ...)`) and log with stack, requestId, url, user id (if available)
  - Ensure `sendError` responses still omit sensitive details

#### 6) Client debug logging (debug)

- [x] Create `lib/logger/client.ts`
  - Export `createClientLogger(namespace: string)` using `debug`
  - Provide convenience namespaces (e.g., `app:*`, `auth:*`, `api:*`)
- [x] Create `plugins/debug.client.ts`
  - Enable via env default `NUXT_PUBLIC_DEBUG` with localStorage override
  - Provide `$debug` via nuxtApp
- [x] Document how to toggle at runtime:
  - In browser console: `localStorage.debug = 'app:*,feature:*'; location.reload()`
  - To disable: `localStorage.removeItem('debug'); location.reload()`

#### 7) Replace ad-hoc console usage

- [x] Search and replace server `console.*` with `event.context.logger` (or `getServerLogger()`)
- [x] Use `createClientLogger('feature:xyz')` in components/composables instead of `console.*`

Files to review for logging (exclude shadcn `components/ui/**`):

- [x] `components/app/Navbar.vue` (UI only)
- [x] `components/auth/AuthButton.vue` (UI only)
- [x] `components/auth/AuthDialog.vue` (UI only)
- [x] `components/auth/AuthDialogTrigger.vue` (UI only)
- [x] `components/auth/AuthEmailInput.vue` (UI only)
- [x] `components/auth/AuthLoginForm.vue` (client logger added)
- [x] `components/auth/AuthNameInput.vue` (UI only)
- [x] `components/auth/AuthPasswordInput.vue` (UI only)
- [x] `components/auth/AuthSignupForm.vue` (client logger added)
- [x] `components/common/ShadowCard.vue` (UI only)
- [x] `composables/useAuth.ts` (client logger added)
- [x] `composables/useTheme.ts` (no logs needed)
- [x] `composables/useToasts.ts` (no logs; toast API)
- [x] `drizzle.config.ts` (config only)
- [x] `eslint.config.ts` (config only)
- [x] `layouts/default.vue` (UI only)
- [x] `lib/auth-client.ts` (no logs)
- [x] `lib/auth.ts` (server logger added in dev)
- [x] `lib/db/index.ts` (no logs)
- [x] `lib/db/schema/auth.ts` (schema only)
- [x] `lib/db/schema/index.ts` (schema only)
- [x] `lib/env/index.ts` (schema only)
- [x] `lib/env/try-parse-env.ts` (console allowed for parse failures)
- [x] `lib/logger/client.ts` (added in Section 6)
- [x] `lib/logger/server.ts` (added in Section 3)
- [x] `lib/schemas/auth.ts` (schema only)
- [x] `lib/toast/types.ts` (types only)
- [x] `lib/types/components/common/shadow-card.ts` (types only)
- [x] `lib/utils.ts` (no logs)
- [x] `middleware/admin.ts` (no logs)
- [x] `middleware/auth.ts` (no logs)
- [x] `middleware/email-verified.ts` (no logs)
- [x] `nuxt.config.ts` (config only)
- [x] `pages/about.vue` (UI only)
- [x] `pages/auth/forgot-password.vue` (UI only)
- [x] `pages/auth/login.vue` (client logger added via form)
- [x] `pages/auth/reset.vue` (UI only)
- [x] `pages/auth/signup.vue` (client logger added via form)
- [x] `pages/dashboard.vue` (client logger added)
- [x] `pages/index.vue` (no logs)
- [x] `pages/unauthorized.vue` (no logs)
- [x] `pages/users.vue` (client logger added)
- [x] `pages/verified.vue` (no logs)
- [x] `plugins/auth.client.ts` (no logs)
- [x] `plugins/color-mode.client.ts` (no logs)
- [x] `plugins/debug.client.ts` (added in Section 6)
- [x] `scripts/db/delete-all-data.ts` (scripts: keep console)
- [x] `scripts/db/seed-users.ts` (scripts: keep console)
- [x] `scripts/db/seed.ts` (scripts: keep console)
- [x] `scripts/env/check-env.ts` (scripts: keep console)
- [x] `server/api/.well-known/[...path].get.ts` (no logs)
- [x] `server/api/auth/[...all].ts` (no logs added)
- [x] `server/api/auth/session.get.ts` (server logger added)
- [x] `server/api/users.get.ts` (server logger added)
- [x] `server/middleware/logger.global.ts` (added in Section 3)
- [x] `server/middleware/request-logger.global.ts` (added in Section 4)
- [x] `server/plugins/error-logger.ts` (added in Section 5)
- [x] `server/types/h3.d.ts` (type augmentation)
- [x] `server/utils/mailer.ts` (no logs; avoid leaking PII)
- [x] `stores/auth-form.ts` (no logs)
- [x] `tailwindcss.config.ts` (config only)

#### 8) Production-safe configuration

- [x] Ensure `LOG_PRETTY=false` in production (dev `.env` keeps it true; `.env.example` notes production guidance)
- [x] Verify logs are structured JSON to stdout (Pino without transport when `LOG_PRETTY=false`)
- [x] Confirm redaction covers auth headers, cookies, passwords, tokens (via `LOG_REDACT` default)

#### 9) QA checklist

- [x] Dev: verify pretty server logs and request IDs in terminal
- [x] Dev: verify `NUXT_PUBLIC_DEBUG` renders browser logs by namespace (set via localStorage.debug)
- [x] Toggle `LOG_REQUESTS` and confirm request logs on/off (requires restart after .env change)
- [x] Trigger an unhandled server error; confirm structured error log with requestId (via temporary QA route)
- [x] Call a couple of API routes rapidly; verify duration and correlation by requestId

#### 10) Docs and examples

- [x] Add README section: Logging overview, env options, usage examples
- [x] Add small examples in `pages/index.vue` (or a demo page) showing client debug usage

#### 11) Finalize

- [x] `pnpm run lint` and fix issues
- [x] Commit: `feat(logging): add Pino server logging and debug client logger`

---

Notes

- Pino pretty output is for local development; ship JSON in production
- Prefer child loggers with `requestId` and domain-specific bindings for easier correlation
- If using a log shipper (e.g., CloudWatch, Loki, Datadog), keep stdout JSON and configure shipping at the platform layer
