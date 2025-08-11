import createDebug from "debug";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const defaultNamespaces = runtimeConfig.public?.debugNamespaces || "";

  // localStorage overrides env-controlled defaults
  const saved = typeof localStorage !== "undefined" ? localStorage.getItem("debug") : null;
  const toEnable = saved && saved.length > 0 ? saved : defaultNamespaces;
  if (toEnable)
    createDebug.enable(toEnable);

  return {
    provide: {
      debug: createDebug,
    },
  };
});
