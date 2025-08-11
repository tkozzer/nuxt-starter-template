import type { H3Event } from "h3";

import { defineEventHandler, getRequestHeader, setResponseHeader } from "h3";
import { randomUUID } from "node:crypto";

import { createChildLogger } from "~/lib/logger/server";

export default defineEventHandler((event: H3Event) => {
  const existing = getRequestHeader(event, "x-request-id");
  const requestId = existing && existing.length > 0 ? existing : randomUUID();

  const method = event.node.req.method || "GET";
  const url = event.path || event.node.req.url || "";

  // Attach logger to event context (augmented dynamically)
  (event as any).context.logger = createChildLogger({ requestId, method, url });

  // Echo request id
  setResponseHeader(event, "x-request-id", requestId);
});
