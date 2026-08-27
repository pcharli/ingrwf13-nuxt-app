export default defineEventHandler(async (e) => {
       const body = await readBody(e)

    // 1. Nettoyage préliminaire des données (suppression des espaces inutiles)
  const login = body.login?.trim()
  const pass = body.pass?.trim()

  // 2. Contrôle de présence des champs obligatoires
  if (!login || !pass) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Champs manquants : login et pass sont obligatoires.'
    })
  }
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE login= ? AND pass = ?',
            [body.login, body.pass]
        )
        if(rows.length > 0){
        // Stocke le token dans un cookie sécurisé (survit au F5)
            const token = useCookie('api_token', {
                maxAge: 60 * 60 * 24 * 7 // Valide 7 jours
            })
            token.value = rows[0].id + rows[0].login
        }
        else {
            return {message: 'pas ok'}
        }

    }catch(error) {
        throw createError({
            statusCode: 500,
            statusMessage: `Erreur MySQL: ${error.message}`        })
    }
})