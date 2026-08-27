import Database from 'better-sqlite3'

const db = new Database('database.db')

export default defineEventHandler(async (event) => {
  // 1. Récupération de l'ID depuis l'URL
  const id = getRouterParam(event, 'id')

  // 2. Vérifier si l'activité existe en base
  const existing = db.prepare('SELECT * FROM activities WHERE id = ?').get(id)
  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: `Impossible de modifier : l'activité ${id} n'existe pas.`
    })
  }

  // 3. Lire le corps (body) de la requête
  const body = await readBody(event)

  // 4. Utiliser les nouvelles valeurs envoyées, ou conserver les anciennes
  const updatedTitle = body.title !== undefined ? body.title : existing.title
  const updatedDuration = body.duration !== undefined ? body.duration : existing.duration

  // 5. Exécution de la mise à jour
  const stmt = db.prepare('UPDATE activities SET title = ?, duration = ? WHERE id = ?')
  stmt.run(updatedTitle, updatedDuration, id)

  // 6. Renvoi de l'objet mis à jour
  return {
    id: Number(id),
    title: updatedTitle,
    duration: updatedDuration
  }
})