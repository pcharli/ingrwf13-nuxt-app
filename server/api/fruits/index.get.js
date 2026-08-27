export default defineEventHandler((e) => {
  setHeader(e, "Content-Type", "application/json");
  return fruitsState
});
