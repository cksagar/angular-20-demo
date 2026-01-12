# Implementation Plan — Login, Posts, Session Persistence

## Goal

- Always land on the `Login` page.
- After successful login, show the `Posts` component.
- Persist authenticated state in `sessionStorage` so the user does not need to re-login during the same browser session.

---

## High-level steps

1. Audit existing routing and auth code ✅
   - Files: `src/app/app.routes.ts`, `src/app/services/auth.service.ts`, `src/app/components/auth/login/login.component.ts`, `src/app/app.config.ts`
2. Fix `AuthService` logic and add session persistence 🔧
   - Implement `login(username, password)`, `logout()`, `isAuthenticated()`.
   - Use `sessionStorage.setItem('isLoggedIn','true')` on successful login and `sessionStorage.removeItem('isLoggedIn')` on logout.
   - Ensure `checkLoginCredentials` returns success for correct credentials and error otherwise.
3. Ensure default/wildcard route redirects to `login` → update `app.routes.ts` 🛣️
   - Add `{ path: '', redirectTo: 'login', pathMatch: 'full' }` and `{ path: '**', redirectTo: 'login' }`.
4. Add `AuthGuard` to protect `/posts` 🛡️
   - Create `src/app/guards/auth.guard.ts` implementing `CanActivate`.
   - Guard should consult `AuthService.isAuthenticated()` and redirect to `/login` when false.
5. Update `LoginComponent` flow ✅
   - On successful login call `authService.login()` and `router.navigate(['/posts'])`.
   - On component init, if already authenticated, redirect to `/posts`.
6. Protect `posts` route with `canActivate: [AuthGuard]`.
7. Add logout (optional but recommended) — clear session and redirect to login.
8. Tests ✔️
   - Add `src/app/services/auth.service.spec.ts` — tests for signup/login success and failure, session handling.
   - Add `src/app/guards/auth.guard.spec.ts` — tests for allow/deny behavior and redirection.
   - Add `src/app/components/auth/login/login.component.spec.ts` — test navigation on successful login.
9. Manual verification / checklist ✅
   - Fresh load (root) → lands on `/login`.
   - Submit valid login → navigates to `/posts`.
   - Refresh `/posts` (same session) → stays on `/posts` (session persists).
   - Close browser tab → open new tab (same session not persisted across browser sessions) → should require re-login.
   - Logout → removes session and redirects to `/login`.

---

## Files to be added/modified

- Modify: `src/app/services/auth.service.ts` (fix login logic + sessionStorage helpers)
- Modify: `src/app/app.routes.ts` (add default/wildcard redirects, add `canActivate` for posts)
- Add: `src/app/guards/auth.guard.ts`
- Modify: `src/app/components/auth/login/login.component.ts` (redirect if already logged in + call login helper)
- Add tests in `src/app/services/auth.service.spec.ts`, `src/app/guards/auth.guard.spec.ts`, `src/app/components/auth/login/login.component.spec.ts`

---

## Time estimate

- Implement core logic and routing: ~30–60 minutes
- Add guard and wiring: ~15–30 minutes
- Add basic tests and run them: ~30 minutes
- Manual verification & fixes: ~15–30 minutes

---

## Notes / Tips

- Use `sessionStorage` instead of `localStorage` to keep session scoped to browser tab lifetime (user requested same-session persistence).
- Keep user data only in-memory (for this demo app) and store only a boolean/session flag in `sessionStorage` — never store plain passwords.
- Add guard unit tests that mock `AuthService` return values to assert both branches.

---

If you'd like, I can now implement the `AuthService` fix and add the tests (`auth.service.spec.ts`) first — say "go ahead" and I'll proceed.
