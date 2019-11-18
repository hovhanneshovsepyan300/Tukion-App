<template>
    <v-app-bar app>
        <v-toolbar-title class="headline text-uppercase">
            <v-btn text>
                <router-link to="/" exact>Home</router-link>
            </v-btn>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn text>
                <router-link to="/messages" exact>Messages</router-link>
            </v-btn>

            <v-btn text>
                <router-link to="/about" exact>About</router-link>
            </v-btn>
            <v-btn text>
                <router-link to="/login" exact>Sign In</router-link>

            </v-btn>
        </v-toolbar-items>

    </v-app-bar>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
</style>