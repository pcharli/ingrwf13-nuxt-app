<script setup>
const { data: test} = await useFetch('/api/test')
</script>
<template>
    <h1>A propos</h1>
    <counter></counter>
    <p>{{ test.message }}</p>
</template>