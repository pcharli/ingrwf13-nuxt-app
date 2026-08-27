export default defineEventHandler(async(e) => {
    const body = await readBody(e)
    const newFruit = {
        id: fruitsState.length + 1,
        label: body.label
    }
    fruitsState.push(newFruit)
     setHeader(e, "Content-Type", "application/json");
     setResponseStatus(e, 201)
  return newFruit;
});
