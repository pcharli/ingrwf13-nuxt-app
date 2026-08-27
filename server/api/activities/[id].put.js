import Database from 'better-sqlite3'

const db = new Database('database.db')

export default defineEventHandler(async (event) => {
  // 1. Récupération de l'ID depuis l'URL
  const id = getRouterParam(event, 'id')

  // 2. Vérification de l'existence de l'élément
  const existing = db.prepare('SELECT * FROM activities WHERE id = ?').get(id)
  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: `L'activité avec l'ID ${id} n'existe pas.`
    })
  }

  // 3. Lecture du corps de la requête
  const body = await readBody(event)

  // 4. Validation stricte : PUT exige un remplacement complet
  if (!body || !body.title || !body.duration) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Les champs "title" et "duration" sont obligatoires pour un remplacement PUT.'
    })
  }

  // 5. Mise à jour complète en base de données
  const stmt = db.prepare('UPDATE activities SET title = ?, duration = ? WHERE id = ?')
  stmt.run(body.title, body.duration, id)

  // 6. Renvoi du nouvel état de l'élément
  return {
    id: Number(id),
    title: body.title,
    duration: body.duration
  }
})