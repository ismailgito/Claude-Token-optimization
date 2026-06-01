# Tomorrow's Tasks: Fix Authentication & SMTP Configuration

## 🚨 Critical Issue
The sign-up process is failing with "Authentication service failed". This is caused by `supabase.auth.signInWithOtp` returning an empty error object, typically indicating a failure in the SMTP relay (Supabase -> Resend).

## ✅ To-Do List

### 1. Supabase Dashboard Configuration
- [ ] Go to **Project Settings > Auth > Email Settings**.
- [ ] Verify **Enable Custom SMTP** is turned ON.
- [ ] Confirm SMTP Host is `smtp.resend.com`.
- [ ] Confirm SMTP Port is `465` or `587`.
- [ ] Confirm SMTP User is `resend`.
- [ ] Confirm SMTP Password is a valid **Resend API Key**.
- [ ] Ensure "Sender email" matches a verified domain in Resend.

### 2. Resend Dashboard Verification
- [ ] Check if the domain used in the "From" address is **Verified** in Resend.
- [ ] Check Resend logs to see if any outgoing mail attempts were blocked or rejected.

### 3. Code Improvements
- [ ] **Fix Signup Logic**: Decide between OTP or Password signup. Currently, the UI asks for a password but `handleSignUp` uses `signInWithOtp` (which ignores the password).
  - If using Password: Change `signInWithOtp` to `supabase.auth.signUp({ email, password })`.
  - If using OTP: Remove the Password field from the signup modal to avoid user confusion.
- [ ] **Improve Error Logging**: Update `AuthModal.jsx` to log the full error object more reliably (some Error properties aren't stringified by default).

### 4. Testing
- [ ] Test sign-up with a fresh email address.
- [ ] Verify that the "Check your email" view appears correctly after "Send OTP".
- [ ] Verify the OTP code is received and works.
