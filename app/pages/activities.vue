<script setup>
//const { token, setToken, logout, isAuthenticated } = useAuth()

const { data: activities, refresh } = await useFetch('/api/activities')

const newTitle = ref('')
const newDuration = ref('')

async function addActivity() {
  if (!newTitle.value || !newDuration.value) return

  // Envoi de la requête POST à l'API
  await $fetch('/api/activities', {
    method: 'POST',
    /*headers: {
      Authorization: `Bearer ${token.value}`
    },*/
    body: {
      title: newTitle.value,
      duration: newDuration.value
    }
  })

  // Réinitialisation du formulaire
  newTitle.value = ''
  newDuration.value = ''

  // Rafraîchir la liste affichée à l'écran
  await refresh()
}
</script>

<template>
  <div>
    <h2>Ajouter une activité</h2>
    <!--<button v-if="!isAuthenticated" @click="setToken('mon-super-token-secret-123')">
      Se connecter
    </button>
    <button v-else @click="logout">
      Déconnexion
    </button>-->
    
    <form @submit.prevent="addActivity">
      <input v-model="newTitle" placeholder="Titre de l'activité" required />
      <input v-model="newDuration" placeholder="Durée (ex: 2h)" required />
      <button type="submit">Ajouter</button>
    </form>

    <hr />

    <h2>Liste des activités</h2>
    <ul>
      <li v-for="item in activities" :key="item.id">
        {{ item.title }} — {{ item.duration }}
      </li>
    </ul>
  </div>
</template>