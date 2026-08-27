// server/api/activities/[id].delete.js
import Database from 'better-sqlite3'
const db = new Database('database.db')

export default defineEventHandler((event) => {
  // Récupère l'ID passé dans l'URL (/api/activities/5)
  const id = getRouterParam(event, 'id')
  db.prepare('DELETE FROM activities WHERE id = ?').run(id)
  return { success: true, deletedId: id }
})