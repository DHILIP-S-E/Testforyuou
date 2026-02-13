## 2026-02-07 - Destructive Action Confirmation
**Learning:** Native `window.confirm` is jarring and lacks accessibility features (ARIA labels, focus management).
**Action:** Use a reusable MUI `DeleteConfirmationDialog` component for all destructive actions. Ensure the "Cancel" button is auto-focused to prevent accidental deletion.
