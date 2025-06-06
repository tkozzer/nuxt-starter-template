export default defineEventHandler(async (event) => {
  // Chrome DevTools integration endpoint
  // Return an empty response to suppress the warning
  setResponseStatus(event, 404);
  return {};
});
