import createDebug from "debug";

export type ClientLogger = ReturnType<typeof createDebug> & {
  child: (suffix: string) => ClientLogger;
};

export function createClientLogger(namespace: string): ClientLogger {
  const base = createDebug(namespace) as ClientLogger;
  base.child = (suffix: string) => createClientLogger(`${namespace}:${suffix}`);
  return base;
}
