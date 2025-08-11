import { z } from "zod";

export type ToastLevel = "info" | "success" | "warning" | "error";

export const toastLevelValues: ToastLevel[] = [
  "info",
  "success",
  "warning",
  "error",
];

export const toastMessageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  level: z.enum(["info", "success", "warning", "error"]).optional(),
  durationMs: z.number().int().positive().optional(),
  dismissible: z.boolean().optional(),
  important: z.boolean().optional(),
});

export type ToastMessage = z.infer<typeof toastMessageSchema>;

export const DEFAULT_TOAST_DURATION_MS = 6000;
