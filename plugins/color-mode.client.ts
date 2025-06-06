export default defineNuxtPlugin(() => {
  // This plugin ensures that the color mode is properly initialized on the client
  const colorMode = useColorMode();

  // Initialize the theme based on stored preference or system preference
  if (import.meta.client) {
    // Ensure the theme is applied immediately
    const applyTheme = (theme: string) => {
      const html = document.documentElement;
      html.classList.remove("light", "dark");
      html.classList.add(theme);
    };

    // Apply initial theme
    applyTheme(colorMode.value);

    // Watch for theme changes and apply them
    watch(() => colorMode.value, (newTheme) => {
      applyTheme(newTheme);
    }, { immediate: false });
  }
});
