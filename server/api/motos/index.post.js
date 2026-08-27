export default defineEventHandler(async (e) => {
    const body = await readBody(e)
    const newMoto = {
        marque: "Honda",
        modele: "500",
        couleur: "rouge"
    }
    try {
        const [result] = await db.query(
    'INSERT INTO motos (marque, modele, couleur) VALUES (?, ?, ?)',
    [body.marque, body.modele, body.couleur ? 1 : 0]
  )

  return {
    id: result.insertId,
    title: body.title,
    duration: body.duration
  }
    } catch(error) {
        throw createError({
            statusCode: 500,
            statusMessage: `Erreur MySQL: ${error.message}`        })
    }
})