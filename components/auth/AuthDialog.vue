<script setup lang="ts">
type AuthDialogProps = {
  open?: boolean;
  defaultMode?: "login" | "signup";
};

type AuthDialogEmits = {
  (e: "update:open", value: boolean): void;
  (e: "success", data: { mode: "login" | "signup" }): void;
};

const props = withDefaults(defineProps<AuthDialogProps>(), {
  open: false,
  defaultMode: "login",
});

const emit = defineEmits<AuthDialogEmits>();

// Auth form store for cross-tab state persistence
const authFormStore = useAuthFormStore();
const { activeTab } = storeToRefs(authFormStore);

// Dialog state
const isOpen = computed({
  get: () => props.open,
  set: value => emit("update:open", value),
});

// Handle successful authentication
function onLoginSuccess() {
  emit("success", { mode: "login" });
  isOpen.value = false;
}

function onSignupSuccess() {
  emit("success", { mode: "signup" });
  isOpen.value = false;
}

// Switch to different tab using store
function switchTab(tab: "login" | "signup") {
  authFormStore.switchTab(tab);
}

// Initialize store and handle dialog state
watch(isOpen, (newValue) => {
  if (newValue) {
    // Initialize store for dialog context
    authFormStore.initializeForDialog(props.defaultMode);
  }
  else {
    // Reset store when dialog closes
    authFormStore.resetOnDialogClose();
  }
});
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-md fixed top-[20%] left-[50%] translate-x-[-50%] translate-y-0 transform-gpu">
      <DialogHeader>
        <DialogTitle class="text-center">
          {{ activeTab === 'login' ? 'Welcome back' : 'Create account' }}
        </DialogTitle>
        <DialogDescription class="text-center">
          {{ activeTab === 'login'
            ? 'Sign in to your account to continue'
            : 'Sign up to get started with your account'
          }}
        </DialogDescription>
      </DialogHeader>

      <Tabs
        :model-value="activeTab"
        class="w-full"
        @update:model-value="(val) => switchTab(val as 'login' | 'signup')"
      >
        <TabsList class="grid w-full grid-cols-2 dark:bg-muted/20">
          <TabsTrigger value="login">
            Log in
          </TabsTrigger>
          <TabsTrigger value="signup">
            Sign up
          </TabsTrigger>
        </TabsList>

        <!--
          ✨ Pinia Magic: Email and name automatically persist when switching tabs!
          Type email in login → switch to signup → email is still there!
        -->

        <!-- Login Tab -->
        <TabsContent value="login" class="space-y-4 mt-4">
          <AuthLoginForm
            :show-switch-to-signup="true"
            @success="onLoginSuccess"
            @switch-to-signup="switchTab('signup')"
          />
        </TabsContent>

        <!-- Signup Tab -->
        <TabsContent value="signup" class="space-y-4 mt-4">
          <AuthSignupForm
            mode="dialog"
            :show-switch-to-login="true"
            @success="onSignupSuccess"
            @switch-to-login="switchTab('login')"
          />
        </TabsContent>
      </Tabs>
    </DialogContent>
  </Dialog>
</template>
