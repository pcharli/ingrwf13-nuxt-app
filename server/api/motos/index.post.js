export default defineEventHandler(async (e) => {
    const body = await readBody(e)
  
    try {
        const [result] = await db.query(
    'INSERT INTO motos (marque, modele, couleur) VALUES (?, ?, ?)',
    [body.marque, body.modele, body.couleur]
  )

    return {
        id: result.insertId,
        title: body.title,
        duration: body.duration
    }
    } catch(error) {
        throw createError({
            statusCode: 500,
            statusMessage: `Erreur MySQL: ${error.message}`
        })
    }
})