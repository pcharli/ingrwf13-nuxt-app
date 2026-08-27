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
            [login, pass]
        )
        if(rows.length > 0){
        // Stocke le token dans un cookie sécurisé (survit au F5)
            const tokenValue = rows[0].id + rows[0].login
            setCookie(e, 'api_token', tokenValue, {
                maxAge: 60 * 60 * 24 * 7, // 7 jours
                httpOnly: true,           // Sécurité : empêche l'accès via document.cookie en JS client
                path: '/'
            })
            userState.token = tokenValue
            return { success: true, message: 'Connexion réussie', token: tokenValue }
        }
        else {
           throw createError({
            statusCode: 401,
            statusMessage: 'Identifiants incorrects'
        })
    }

    }catch(error) {
        throw createError({
            statusCode: 500,
            statusMessage: `Erreur MySQL: ${error.message}`        })
    }
})