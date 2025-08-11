import pino from "pino";

import env from "~/lib/env";

let baseLogger: pino.Logger | undefined;

function buildBaseLogger(): pino.Logger {
  const options: pino.LoggerOptions = {
    level: env.LOG_LEVEL,
    messageKey: "message",
    redact: {
      paths: (env.LOG_REDACT ?? []) as string[],
      censor: "[Redacted]",
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  };

  if (env.LOG_PRETTY) {
    // Pretty printing for local development only
    const destination = pino.transport({
      target: "pino-pretty",
      options: {
        colorize: true,
        singleLine: false,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    });
    return pino(options, destination as any);
  }

  return pino(options);
}

export function getServerLogger(): pino.Logger {
  if (!baseLogger)
    baseLogger = buildBaseLogger();
  return baseLogger;
}

export function createChildLogger(bindings: Record<string, unknown>): pino.Logger {
  return getServerLogger().child(bindings);
}

export type { Logger } from "pino";
