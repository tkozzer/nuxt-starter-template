import type { H3Event } from "h3";

import { defineEventHandler } from "h3";

import env from "~/lib/env";

export default defineEventHandler((event: H3Event) => {
  if (!env.LOG_REQUESTS)
    return;

  // The per-request logger and x-request-id are attached by logger.global.ts
  const logger = event.context.logger;
  const start = process.hrtime.bigint();

  // Minimal start log
  logger.info({
    msg: "request:start",
    method: event.node.req.method,
    path: event.path,
  });

  event.node.res.once("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
    const status = event.node.res.statusCode;
    const contentLengthHeader = event.node.res.getHeader("content-length");
    const responseBytes = typeof contentLengthHeader === "string"
      ? Number.parseInt(contentLengthHeader)
      : typeof contentLengthHeader === "number"
        ? contentLengthHeader
        : undefined;

    logger.info({
      msg: "request:finish",
      status,
      durationMs: Number.isFinite(durationMs) ? Math.round(durationMs) : undefined,
      responseBytes,
    });
  });
});
