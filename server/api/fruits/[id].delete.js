export default defineEventHandler((event) => {

  // 1. Récupération du paramètre "id" depuis l'URL
  const id = getRouterParam(event, 'id')


 const index = fruitsState.findIndex(item => item.id == id)


  // 2. Gestion du cas où la ressource n'existe pas
  if (index == -1) {
    throw createError({
      statusCode: 404,
      statusMessage: `Le fruit avec l'ID ${id} n'a pas été trouvé.`
    })
  }

  // 4. Renvoi de l’objet trouvé
  fruitsState.splice(index,1)
   setHeader(e, "Content-Type", "application/json");
     setResponseStatus(e, 200)
  return fruitsState
})