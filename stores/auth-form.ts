import { defineStore } from "pinia";

export const useAuthFormStore = defineStore("authForm", () => {
  // Persistent form data that survives tab switches
  const formData = reactive({
    email: "",
    name: "",
    // Note: We never persist passwords for security reasons
  });

  // Current active tab (for dialog mode)
  const activeTab = ref<"login" | "signup">("login");

  // Context tracking (dialog vs page)
  const context = ref<"dialog" | "page">("dialog");

  // Computed getters
  const hasPersistedEmail = computed(() => !!formData.email.trim());
  const hasPersistedName = computed(() => !!formData.name.trim());
  const isDialogContext = computed(() => context.value === "dialog");
  const isPageContext = computed(() => context.value === "page");

  // Actions
  const updateEmail = (email: string) => {
    formData.email = email;
  };

  const updateName = (name: string) => {
    formData.name = name;
  };

  const switchTab = (tab: "login" | "signup") => {
    activeTab.value = tab;
    // Email and name automatically persist across tabs! ✨
  };

  const clearFormData = () => {
    formData.email = "";
    formData.name = "";
  };

  const resetOnDialogClose = () => {
    // Clear all form data when dialog closes
    clearFormData();
    activeTab.value = "login";
  };

  const setInitialTab = (tab: "login" | "signup") => {
    activeTab.value = tab;
  };

  const setContext = (newContext: "dialog" | "page") => {
    context.value = newContext;
  };

  const resetOnPageLeave = () => {
    // Optionally clear data when leaving pages
    // For better UX, we might keep email but clear name
    formData.name = "";
    // Keep email for convenience across page navigation
  };

  const initializeForDialog = (initialTab: "login" | "signup" = "login") => {
    setContext("dialog");
    setInitialTab(initialTab);
  };

  const initializeForPage = (page: "login" | "signup") => {
    setContext("page");
    activeTab.value = page;
  };

  return {
    // State (readonly for external access)
    // Expose raw state so Pinia can properly hydrate without readonly errors
    formData,
    activeTab,
    context,

    // Computed
    hasPersistedEmail,
    hasPersistedName,
    isDialogContext,
    isPageContext,

    // Actions
    updateEmail,
    updateName,
    switchTab,
    setContext,
    clearFormData,
    resetOnDialogClose,
    resetOnPageLeave,
    setInitialTab,
    initializeForDialog,
    initializeForPage,
  };
});
