### Vue Sonner Toast Checklist (Nuxt 3 + shadcn-vue)

Refs: [shadcn-vue Sonner docs](https://www.shadcn-vue.com/docs/components/sonner.html), [vue-sonner site](https://vue-sonner.vercel.app/)

Branch: `feat/add-sonner-toast-messages`

---

#### 0) Pre-flight

- [x] Confirm `pnpm` is used for all commands
- [x] Ensure `shadcn-nuxt` is installed (present in `package.json`)
  - Note: We use the `shadcn-nuxt` module; the CLI is executed via `pnpm dlx shadcn-vue@latest` (not a local dep)
- [x] Verify no custom components live in `components/ui/` (shadcn-only)
  - Verified directories only for shadcn components (alert, avatar, badge, button, card, dialog, dropdown-menu, form, input, label, navigation-menu, separator, sheet, tabs)

#### 1) Install Sonner (via shadcn CLI)

- [x] Check if `components/ui/sonner/` exists
- [x] If missing, install: `pnpm dlx shadcn-vue@latest add sonner`
  - Ran with `--overwrite --yes` to ensure files were generated
- [x] Verify `components/ui/sonner` was created and `Toaster` is available
  - Created: `components/ui/sonner/Sonner.vue`, `components/ui/sonner/index.ts` (re-exports `Toaster`)

#### 2) Global CSS (vue-sonner v2)

- [x] Add `vue-sonner/style.css` once globally
  - Option A (preferred): add to `nuxt.config.ts` `css: ['vue-sonner/style.css']`
  - Option B: import in the file that renders `<Toaster />` (script block)

#### 3) Place Toaster under the navbar (top-center)

Context: Navbar has class `h-14` (≈ 56px) and is sticky.

- [x] Add `<Toaster />` to `layouts/default.vue` inside the layout tree
- [x] Configure position to top-center
  - [x] Set `position="top-center"`
  - [x] Set `offset` to `56` (or `56px`) so it appears just below the navbar
  - [x] Add `class="pointer-events-auto"` (for compatibility with dialogs; see shadcn note)
- [x] If using vue-sonner v1, wrap with `<ClientOnly>`; if v2, no wrapper needed (verify installed version)

#### 4) One-toast-at-a-time behavior (Queueing)

Goal: Only one Sonner message visible at a time; additional messages queue and show sequentially.

- [x] Investigate if `Toaster` supports limiting visible toasts (e.g., `visibleToasts={1}`)
  - [x] If supported, set it to 1 and confirm behavior
- [ ] If not supported or insufficient, implement a queue wrapper:
  - [ ] Create Pinia store `stores/toast-queue.ts` with a FIFO queue and a `isShowing` flag
  - [ ] Expose `enqueueToast(message: ToastMessage, options?: ToastOptions)` and internal `showNext()`
  - [ ] When showing a toast, set duration and attach close/timeout handling to trigger `showNext()`
  - [ ] Ensure manual dismiss or clicks also advance the queue
  - [ ] Provide a composable `useToastQueue()` that app code uses instead of calling `toast(...)` directly
  - [ ] Replace direct `toast(...)` calls across the app with `useToastQueue().enqueueToast(...)`

#### 5) Progress countdown bar

- [ ] Prefer enabling the built-in progress indicator if supported by `vue-sonner` (verify option name)
- [x] Set a default `duration` (e.g., 4000–6000ms) for consistent countdown
- [x] If built-in progress is unavailable, style a progress bar via CSS targeting the toast element and animating width over `duration`
  - Implemented with `[data-sonner-toast]::after` animation keyed by `--sonner-duration` (set on `<Toaster />`)

#### 6) Defaults and styling

- [x] Configure `Toaster` defaults (duration, theme sync with color mode, `richColors` if desired)
  - Applied `:duration="6000"`, theme bound to color mode, and `rich-colors`
- [x] Ensure z-index plays nicely with navbar (`Navbar` uses `z-50`); toasts should appear above page content but visually originate below the navbar edge
  - Toaster class includes `z-40`; navbar is `z-50` and sticky
- [x] Verify responsive spacing on mobile; adjust `offset` if the navbar height differs
  - Set both `:offset="56"` and `:mobile-offset="56"`

#### 7) Developer API and typings

- [x] Create `lib/toast/types.ts` with `ToastLevel` union (info/success/warning/error) and `ToastMessage` type
  - Added `toastMessageSchema` (Zod) with fields: `title`, `description?`, `level?`, `durationMs?`, `dismissible?`, `important?`
- [x] Create `composables/useToasts.ts` exporting typed helpers: `info()`, `success()`, `warning()`, `error()`, `promise()` that delegate to queue
- [x] Document the allowed payload shape with Zod validation
  - Documented via `toastMessageSchema`; actions can be used via direct `toast(…, { action })` if needed

#### 8) QA checklist

- [x] Trigger multiple toasts quickly and confirm strict one-at-a-time behavior
- [x] Verify top-center position and that the first toast appears just below the navbar
- [x] Confirm progress countdown renders and completes on schedule
- [x] Test interaction with overlays (dialogs/sheets): toasts remain clickable (`pointer-events-auto`)
- [x] Test on small screens and dark mode

#### 9) Cleanup and docs

- [ ] Add example usage snippet to `pages/index.vue` (behind a small demo button)
- [ ] Add brief usage section to `README.md` (how to enqueue a toast)
- [ ] Run `pnpm run lint` and fix any issues
- [ ] Commit changes with a clear message (e.g., "feat(sonner): add global toaster and queued toast API")

---

Notes

- Sonner docs (Vue port via shadcn): https://www.shadcn-vue.com/docs/components/sonner.html
- `pointer-events-auto` recommendation when using Dialogs: see Sonner + Dialog example in docs
- Use `pnpm` for all CLI interactions per project rules
