<template>
    <v-parallax
            dark
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
        <v-layout
                align-center
                column
                justify-center
        >
            <h1 class="display-2 font-weight-thin mb-4">Page not found</h1>
            <br>
            <h4 class="subheading">
                <router-link to="/" exac>Go to home</router-link>
            </h4>
        </v-layout>
    </v-parallax>
</template>

<script>
    export default {
        name: "PageNotFound"
    }
</script>

<style scoped>
</style>