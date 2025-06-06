/**
 * Theme management composable
 * Provides reactive theme state and toggle functionality
 */
export function useTheme() {
  const colorMode = useColorMode();

  // Reactive computed values
  const isDark = computed(() => colorMode.value === "dark");
  const isLight = computed(() => colorMode.value === "light");
  const isSystem = computed(() => colorMode.preference === "system");

  // Theme toggle functions
  const toggleTheme = () => {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  };

  const setTheme = (theme: "light" | "dark" | "system") => {
    colorMode.preference = theme;
  };

  const setLight = () => setTheme("light");
  const setDark = () => setTheme("dark");
  const setSystem = () => setTheme("system");

  // Get the current theme icon name for UI components
  const themeIcon = computed(() => {
    return colorMode.value === "dark" ? "lucide:sun" : "lucide:moon";
  });

  // Get theme display name
  const themeName = computed(() => {
    switch (colorMode.value) {
      case "dark":
        return "Dark";
      case "light":
        return "Light";
      default:
        return "System";
    }
  });

  return {
    // State
    colorMode,
    isDark,
    isLight,
    isSystem,
    themeIcon,
    themeName,

    // Actions
    toggleTheme,
    setTheme,
    setLight,
    setDark,
    setSystem,
  };
}
