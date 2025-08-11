# Shared Authentication System

This directory contains a comprehensive, reusable authentication system that works seamlessly across both dialog-based and page-based auth flows.

## 🌟 Key Features

- **Shared State Management**: Uses Pinia store for cross-component data persistence
- **Flexible Form Components**: Reusable forms that work in dialogs and pages
- **Consistent Validation**: Shared Zod schemas with different modes
- **Email Persistence**: Email auto-populates when switching between login/signup
- **TypeScript Support**: Full type safety throughout
- **Password Manager Friendly**: Proper autocomplete attributes
- **Accessibility**: Built on shadcn-vue components with a11y support

## 📁 File Structure

```
components/auth/
├── README.md                   # This documentation
├── AuthDialog.vue             # Dialog-based auth with tabs
├── AuthDialogTrigger.vue      # Trigger button for auth dialog
├── AuthButton.vue             # User avatar/login button for navbar
├── AuthLoginForm.vue          # Reusable login form component
├── AuthSignupForm.vue         # Reusable signup form component
└── ...
```

## 🏪 Pinia Store (`stores/auth-form.ts`)

The auth form store manages persistent state across all auth components:

```typescript
// State
type AuthFormState = {
  formData: {
    email: string; // Persists across tabs/pages
    name: string; // Persists across tabs/pages
    // Passwords are NEVER persisted for security
  };
  activeTab: "login" | "signup";
  context: "dialog" | "page";
};

// Actions
type AuthFormActions = {
  updateEmail: (email: string) => void;
  updateName: (name: string) => void;
  switchTab: (tab: "login" | "signup") => void;
  initializeForDialog: (initialTab?: "login" | "signup") => void;
  initializeForPage: (page: "login" | "signup") => void;
  resetOnDialogClose: () => void;
};
```

### 🔐 Security Note

**Passwords are never stored in the Pinia store** for security reasons. Only non-sensitive data (email, name) persists across form interactions.

## 📋 Validation Schemas (`lib/schemas/auth.ts`)

Shared Zod schemas provide consistent validation:

```typescript
// For dialog mode (conditional validation)
authSchemas.signup; // Shows errors only when fields have content

// For page mode (strict validation)
authSchemas.signupPage; // Shows errors immediately for empty fields

// Login schema (same for both modes)
authSchemas.login;
```

## 🧩 Reusable Components

### `AuthLoginForm.vue`

Flexible login form that works in dialogs and pages:

```vue
<AuthLoginForm
  :show-title="false"
  :show-switch-to-signup="true"
  title-text="Welcome back"
  submit-button-text="Sign in"
  @success="onLoginSuccess"
  @switch-to-signup="switchToSignup"
/>
```

**Props:**

- `showTitle?: boolean` - Show/hide form title
- `showSwitchToSignup?: boolean` - Show/hide "switch to signup" link
- `titleText?: string` - Custom title text
- `submitButtonText?: string` - Custom submit button text

**Events:**

- `success(data: LoginFormData)` - Emitted on successful login
- `switchToSignup()` - Emitted when user clicks "switch to signup"

### `AuthSignupForm.vue`

Flexible signup form with different validation modes:

```vue
<AuthSignupForm
  mode="dialog"
  :show-title="false"
  :show-switch-to-login="true"
  :show-terms-notice="true"
  @success="onSignupSuccess"
  @switch-to-login="switchToLogin"
/>
```

**Props:**

- `mode?: 'dialog' | 'page'` - Validation mode (conditional vs strict)
- `showTitle?: boolean` - Show/hide form title
- `showSwitchToLogin?: boolean` - Show/hide "switch to login" link
- `showTermsNotice?: boolean` - Show/hide terms acceptance notice
- `titleText?: string` - Custom title text
- `submitButtonText?: string` - Custom submit button text

**Events:**

- `success(data: SignupFormData | SignupPageFormData)` - Emitted on successful signup
- `switchToLogin()` - Emitted when user clicks "switch to login"

## 🎭 Dialog vs Page Modes

### Dialog Mode (`mode="dialog"`)

- **Conditional validation**: Only shows errors when fields have content
- **Cross-tab persistence**: Email/name persist when switching login ↔ signup
- **Compact layout**: Optimized for modal dialogs
- **Dynamic validation**: Form submission disabled until all fields valid

### Page Mode (`mode="page"`)

- **Strict validation**: Shows errors for empty required fields
- **Cross-page persistence**: Email persists when navigating between auth pages
- **Full layout**: Optimized for standalone pages
- **Standard validation**: Traditional form validation approach

## 🚀 Usage Examples

### Dialog Usage

```vue
<script setup>
const isDialogOpen = ref(false);

function onAuthSuccess(data) {
  console.warn("Auth successful:", data.mode);
  // Handle success (redirect, show toast, etc.)
}
</script>

<template>
  <!-- Trigger -->
  <AuthDialogTrigger
    mode="signup"
    @click="isDialogOpen = true"
  >
    Get Started
  </AuthDialogTrigger>

  <!-- Dialog -->
  <AuthDialog
    v-model:open="isDialogOpen"
    default-mode="signup"
    @success="onAuthSuccess"
  />
</template>
```

### Page Usage

```vue
<script setup>
// pages/auth/login.vue
const authFormStore = useAuthFormStore();

onMounted(() => {
  authFormStore.initializeForPage("login");
});

function onLoginSuccess() {
  // Success handled by useAuth composable (auto-redirect)
}
</script>

<template>
  <div class="auth-page">
    <h1>Sign in to your account</h1>

    <AuthLoginForm
      :show-title="false"
      :show-switch-to-signup="false"
      @success="onLoginSuccess"
    />

    <p>
      Don't have an account?
      <NuxtLink to="/auth/signup">
        Sign up here
      </NuxtLink>
    </p>
  </div>
</template>
```

### Standalone Form Usage

```vue
<script setup>
const authFormStore = useAuthFormStore();

// Initialize for specific context
onMounted(() => {
  authFormStore.initializeForDialog("login");
});

function handleLogin(data) {
  console.warn("Login data:", data);
}

function switchToSignup() {
  authFormStore.switchTab("signup");
}
</script>

<template>
  <div class="custom-auth-container">
    <AuthLoginForm
      :show-title="true"
      :show-switch-to-signup="true"
      title-text="Welcome back!"
      submit-button-text="Let's go!"
      @success="handleLogin"
      @switch-to-signup="switchToSignup"
    />
  </div>
</template>
```

## ✨ State Persistence Magic

The system automatically handles state persistence:

1. **Cross-tab in Dialogs**:

   - Type email in login → switch to signup → email is there!
   - Fill name in signup → switch to login → switch back → name is there!

2. **Cross-page Navigation**:

   - Enter email on login page → navigate to signup page → email persists
   - Name is cleared between pages for better UX

3. **Auto-cleanup**:
   - Dialog close → all data cleared
   - Page navigation → name cleared, email preserved

## 🎨 Customization

### Custom Validation

```typescript
// Extend the auth schemas
import { authSchemas } from "~/lib/schemas/auth";

const customLoginSchema = authSchemas.login.extend({
  rememberMe: z.boolean().optional(),
});
```

### Custom Components

```vue
<!-- Create custom auth form wrapper -->
<template>
  <div class="my-custom-auth-wrapper">
    <MyCustomHeader />

    <AuthLoginForm
      v-bind="$attrs"
      @success="handleSuccess"
    />

    <MyCustomFooter />
  </div>
</template>
```

### Store Extensions

```typescript
// Extend the auth form store
export const useCustomAuthFormStore = defineStore("customAuthForm", () => {
  const baseStore = useAuthFormStore();

  // Add custom fields
  const additionalData = reactive({
    newsletterSubscribe: false,
    referralCode: "",
  });

  return {
    ...baseStore,
    additionalData,
  };
});
```

## 🔄 Migration Guide

### From Individual Forms

If you have existing auth forms, here's how to migrate:

**Before:**

```vue
<!-- Old individual form -->
<form @submit="handleLogin">
  <input v-model="email" type="email" />
  <input v-model="password" type="password" />
  <button type="submit">Login</button>
</form>
```

**After:**

```vue
<!-- New shared component -->
<AuthLoginForm @success="handleLogin" />
```

### From Separate Stores

**Before:**

```typescript
// Multiple stores
const loginStore = useLoginStore();
const signupStore = useSignupStore();
```

**After:**

```typescript
// Single unified store
const authFormStore = useAuthFormStore();
```

## 🧪 Testing

```typescript
// Test store functionality
import { createPinia, setActivePinia } from "pinia";

import { useAuthFormStore } from "~/stores/auth-form";

describe("AuthFormStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("persists email across tabs", () => {
    const store = useAuthFormStore();

    store.updateEmail("test@example.com");
    store.switchTab("signup");

    expect(store.formData.email).toBe("test@example.com");
  });
});
```

## 🚨 Breaking Changes

When updating this system:

1. **Props changes**: May require updating component usage
2. **Store structure**: May need to clear user data or update store usage
3. **Schema changes**: May affect form validation behavior

## 🛣️ Roadmap

Future enhancements:

- [ ] Social login integration (Google, GitHub, etc.)
- [ ] Two-factor authentication support
- [ ] Remember me functionality
- [ ] Password strength indicator
- [ ] Account verification flow
- [ ] Custom field support
- [ ] Theme customization
- [ ] Animation/transition system

## 💡 Best Practices

1. **Always use the store**: Don't manage auth form state manually
2. **Leverage shared schemas**: Don't create custom validation unless needed
3. **Emit success events**: Let parent components handle success logic
4. **Initialize context properly**: Use `initializeForDialog` or `initializeForPage`
5. **Handle cleanup**: Store automatically cleans up, but be aware of the lifecycle
6. **Security first**: Never persist sensitive data like passwords
7. **Accessibility**: Shared components handle a11y, but test in your context

---

This shared auth system provides a robust foundation that can grow with your application while maintaining consistency and developer experience.
