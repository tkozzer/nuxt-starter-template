/* eslint-disable ts/consistent-type-definitions */
import type { Logger } from "pino";

declare module "h3" {
  // Augment existing interface via declaration merging
  interface H3EventContext {
    logger: Logger;
  }
}
