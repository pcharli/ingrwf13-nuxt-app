<template>
    <header>
        <h1>First app Nuxt</h1>
        <nav>
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/apropos">À propos</NuxtLink>
            <NuxtLink to="/fruits">Nos fruits</NuxtLink>
            <NuxtLink to="/activities">Activités</NuxtLink>
        </nav>
    </header>
    <main>
        <slot />
    </main>
</template>