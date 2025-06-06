export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, "path");

  // Handle Chrome DevTools specific request
  if (path === "appspecific/com.chrome.devtools.json") {
    // Return empty JSON to satisfy DevTools request
    setResponseStatus(event, 200);
    return {};
  }

  // Handle other common .well-known requests
  if (path === "security.txt") {
    setHeader(event, "Content-Type", "text/plain");
    return `Contact: mailto:security@example.com
Expires: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()}`;
  }

  if (path === "robots.txt") {
    setHeader(event, "Content-Type", "text/plain");
    return `User-agent: *
Allow: /`;
  }

  // Return empty JSON for unknown .well-known requests to prevent 404s
  setResponseStatus(event, 200);
  return {};
});
