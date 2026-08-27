// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  // S'assure que Nitro scanne bien le dossier server à la racine
  serverDir: 'server',
  runtimeConfig: {
    // Clé accessible uniquement côté serveur
    apiSecretToken: process.env.API_SECRET_TOKEN || 'mon-super-token-secret-123'
  }
})
