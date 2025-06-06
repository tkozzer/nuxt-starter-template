import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-27",
  devtools: { enabled: true },

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || "",
    // Supabase server-side keys
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    public: {
      // Supabase client-side keys (multiple naming conventions for compatibility)
      supabaseUrl: process.env.SUPABASE_URL || "",
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
    },
  },

  alias: {
    "@lib": fileURLToPath(new URL("./lib", import.meta.url)),
    "@db": fileURLToPath(new URL("./lib/db", import.meta.url)),
    "@schemas": fileURLToPath(new URL("./lib/db/schema", import.meta.url)),
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "shadcn-nuxt",
  ],

  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },

  css: ["~/assets/css/main.css"],

  eslint: {
    config: {
      standalone: false,
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },

  components: [
    {
      path: "~/components/ui",
      // Keep default behavior for UI components
    },
    {
      path: "~/components/common",
      pathPrefix: false, // This removes the "Common" prefix
    },
    {
      path: "~/components",
      // Keep default behavior for other component directories
    },
  ],

  future: {
    compatibilityVersion: 4,
  },

});
