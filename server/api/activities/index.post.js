// server/api/activities.post.js
import Database from 'better-sqlite3'

const db = new Database('database.db')

export default defineEventHandler(async (event) => {
  // 1. Lire le corps (body) de la requête JSON envoyée par le client
  const body = await readBody(event)

  // Validation minimale
  if (!body || !body.title || !body.duration) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Les champs title et duration sont requis.'
    })
  }

  // 2. Insérer l'activité dans SQLite
  const rq = db.prepare('INSERT INTO activities (title, duration) VALUES (?, ?)')
  const info = rq.run(body.title, body.duration)

  // 3. Renvoyer l'élément créé avec son nouvel ID
  return {
    id: info.lastInsertRowid,
    title: body.title,
    duration: body.duration
  }
})