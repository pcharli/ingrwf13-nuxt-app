<script setup>
const { data: fruits, refresh } = await useFetch("/api/fruits");

const newFruit = ref({
    label:''
})

const addFruit = async () => {
    const backNewfruit = await $fetch("/api/fruits", {
        method: "POST",
        body: newFruit.value
    })
    console.log(backNewfruit)
    await refresh()
}

const delFruit = async (id) => {
    if(confirm('Sûr ?')) {
            await $fetch(`/api/fruits/${id}`, {
            method: "DELETE"
        })
        await refresh()                                     
    }
}
</script>
<template>
  <h1>Nos fruits</h1>
  <ul>
    <li v-for="(fruit, key) in fruits" :key="key">{{ fruit.label }}
        <div class="actions">
            <a href="" class="del" @click.prevent="delFruit(fruit.id)">X</a> |
            <a href=""></a>
        </div>
    </li>
  </ul>
  <hr />
  <h2>Nouveau fruit</h2>
  <form @submit.prevent="addFruit">
    <input type="text" placeholder="nom du fruit" v-model="newFruit.label" />
    <button>Ajouter</button>
    </form>
</template>
