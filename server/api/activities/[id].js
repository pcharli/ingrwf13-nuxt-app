import Database from 'better-sqlite3'

const db = new Database('database.db')

export default defineEventHandler((event) => {
  // 1. Récupération du paramètre "id" depuis l'URL
  const id = getRouterParam(event, 'id')

  // 2. Préparation et exécution de la requête SQL sécurisée
  const stmt = db.prepare('SELECT * FROM activities WHERE id = ?')
  const activity = stmt.get(id)

  // 3. Gestion du cas où la ressource n'existe pas
  if (!activity) {
    throw createError({
      statusCode: 404,
      statusMessage: `L'activité avec l'ID ${id} n'a pas été trouvée.`
    })
  }

  // 4. Renvoi de l’objet trouvé
  return activity
})