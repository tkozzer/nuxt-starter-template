<template>
  <div class="flex min-h-screen flex-col">
    <!-- Color Scheme component for SSR support -->
    <ColorScheme placeholder="" tag="div">
      <!-- Navigation Bar -->
      <AppNavbar />

      <!-- Main Content -->
      <main class="flex-1 flex flex-col">
        <slot />
      </main>
    </ColorScheme>
  </div>
</template>
