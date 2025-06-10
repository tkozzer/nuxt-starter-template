# Pinia Stores

This directory contains Pinia stores for complex state management.

## auth-form.ts

**Purpose**: Manages auth dialog form state that persists across login/signup tab switches.

**Use Case**: When a user types their email in the login form, then switches to signup, the email automatically appears in the signup form.

**Features**:

- ✅ **Email persistence** across login ↔ signup tabs
- ✅ **Name persistence** (signup → login → signup)
- ✅ **Security**: Never persists passwords
- ✅ **Auto-cleanup**: Resets when dialog closes
- ✅ **TypeScript**: Fully typed with proper IDE support

**Usage**:

```vue
<script setup>
const authFormStore = useAuthFormStore();
const { formData, activeTab } = storeToRefs(authFormStore);

// Email automatically syncs across forms
function updateEmail(email: string) {
  authFormStore.updateEmail(email);
}

// Switch tabs while preserving data
function switchToSignup() {
  authFormStore.switchTab("signup");
  // Email persists! ✨
}
</script>
```

**Why Pinia Over useState**:

- Complex cross-component state synchronization
- Better separation of concerns
- Easier testing and debugging
- Cleaner component logic

This is a perfect example of when to graduate from simple `useState` to a proper Pinia store.
