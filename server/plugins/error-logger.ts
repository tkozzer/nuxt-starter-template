import { getRequestHeader } from "h3";

import { getServerLogger } from "~/lib/logger/server";

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("error", (error, { event }) => {
    const logger = event?.context?.logger ?? getServerLogger();
    const method = event?.node.req.method;
    const url = event?.path || event?.node.req.url;
    const status = event?.node.res.statusCode;
    const requestId = getRequestHeader(event!, "x-request-id");

    logger.error(
      {
        err: error,
        msg: "request:error",
        method,
        url,
        status,
        requestId,
      },
    );
  });
});
