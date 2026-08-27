export default defineEventHandler(async (e) => {
    const body = await readBody(e)

    // 1. Nettoyage préliminaire des données (suppression des espaces inutiles)
  const marque = body.marque?.trim()
  const modele = body.modele?.trim()
  const couleur = body.couleur?.trim()

  // 2. Contrôle de présence des champs obligatoires
  if (!marque || !modele || !couleur) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Champs manquants : marque, modele et couleur sont obligatoires.'
    })
  }
    
  
    try {
        const [result] = await db.query(
    'INSERT INTO motos (marque, modele, couleur) VALUES (?, ?, ?)',
    [body.marque, body.modele, body.couleur]
  )

    return {
        id: result.insertId,
        modele: body.modele,
        marque: body.marque,
        couleur: body.couleur
    }
    } catch(error) {
        throw createError({
            statusCode: 500,
            statusMessage: `Erreur MySQL: ${error.message}`
        })
    }
})