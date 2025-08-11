import { toast } from "vue-sonner";

import type { ToastMessage } from "~/lib/toast/types";

import { DEFAULT_TOAST_DURATION_MS } from "~/lib/toast/types";

function showBaseToast(payload: ToastMessage) {
  const duration = payload.durationMs ?? DEFAULT_TOAST_DURATION_MS;
  const common = {
    description: payload.description,
    duration,
    dismissible: payload.dismissible ?? true,
    important: payload.important ?? false,
  } as const;

  switch (payload.level) {
    case "success":
      return toast.success(payload.title, common);
    case "warning":
      return toast.warning(payload.title, common);
    case "error":
      return toast.error(payload.title, common);
    case "info":
    default:
      return toast.info?.(payload.title, common) ?? toast(payload.title, common);
  }
}

export function useToasts() {
  function info(title: string, description?: string, durationMs?: number) {
    return showBaseToast({ title, description, level: "info", durationMs });
  }

  function success(title: string, description?: string, durationMs?: number) {
    return showBaseToast({ title, description, level: "success", durationMs });
  }

  function warning(title: string, description?: string, durationMs?: number) {
    return showBaseToast({ title, description, level: "warning", durationMs });
  }

  function error(title: string, description?: string, durationMs?: number) {
    return showBaseToast({ title, description, level: "error", durationMs });
  }

  async function promise<T>(
    promiseFactory: () => Promise<T>,
    messages: { loading?: string; success?: (data: T) => string | string; error?: (err: unknown) => string | string },
    durationMs?: number,
  ) {
    const duration = durationMs ?? DEFAULT_TOAST_DURATION_MS;
    return toast.promise(promiseFactory, {
      loading: messages.loading ?? "Loading...",
      success: (data: T) => (typeof messages.success === "function" ? messages.success(data) : messages.success ?? "Success"),
      error: (err: unknown) => (typeof messages.error === "function" ? messages.error(err) : messages.error ?? "Error"),
      duration,
    });
  }

  return { info, success, warning, error, promise };
}
