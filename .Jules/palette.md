## 2025-01-29 - [Accessibility] Replaced native confirm with MUI Dialog
**Learning:** Native `window.confirm` blocks the thread and has poor accessibility (screen reader support varies, focus trapping is inconsistent). Custom dialogs allow precise control over ARIA attributes and focus management (e.g., auto-focusing 'Cancel' to prevent accidental deletion).
**Action:** Always prefer custom accessible dialog components for destructive actions over native browser prompts. Ensure 'Cancel' is the default focus.
