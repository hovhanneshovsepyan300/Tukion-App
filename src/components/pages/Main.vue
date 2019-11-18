<template>
    <v-app light>
        <v-content>
            <section>
                <v-layout
                        column
                        wrap
                        class="my-12"
                        align-center
                >
                    <v-flex xs12 sm4 class="my-4">
                        <div class="text-center">
                            <h2 class="headline">All Categories</h2>
                        </div>
                    </v-flex>
                    <v-flex xs12 sm8 class="my-8">                
                        <v-dialog v-model="dialog" max-width="500px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn small color="primary" dark v-on="on">Add category</v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">Add new list</span>
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text style="height: 150px;">
                                            <v-text-field
                                                label="Category name"
                                                v-model="title"
                                                column
                                            ></v-text-field>
                                        </v-card-text>

                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                            <v-btn color="blue darken-1" text @click="addCategory">Save</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                    </v-flex>
                </v-layout>

                 <v-card
                    class="mx-auto"
                    max-width="400"
                    tile
                >
                    <v-list>
                        <!-- <v-subheader>Categories</v-subheader> -->
                        <v-list-item-group color="primary">
                            <v-list-item
                                v-for="(item, i) in categories"
                                :key="i"
                                @click="$router.push({ path: `/category/${item._id}` })"
                            >
                                <!-- <v-list-item-avatar v-if="avatar">
                                    <v-img :src="item.avatar"></v-img>
                                </v-list-item-avatar> -->
                                <v-list-item-content>
                                    <v-list-item-title v-html="item.title"></v-list-item-title>
                                    <!-- <v-list-item-subtitle v-if="twoLine || threeLine" v-html="item.subtitle"></v-list-item-subtitle> -->
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                 </v-card>
                 <!-- <a href="http://localhost:5000/api/video/download_file" download="w3logo">
                    <img src="http://localhost:5000/api/video/download_file" alt="W3Schools" width="104" height="142">
                </a> -->

            </section>
        </v-content>
    </v-app>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "Main",
        data() {
            return {
                title: null,
                headers: [
                    { text: 'Video', value: 'url' },
                    {
                        text: 'Tilte',
                        align: 'left',
                        sortable: true,
                        value: 'title',
                    },
                    { text: 'Description', value: 'description', sortable: false },
                    { text: 'Duration', value: 'duration', sortable: false },
                    { text: 'Tumbnaul Url', value: 'tumbnail_url', sortable: false },
                    { text: 'Chanel Tiltle', value: 'channelTitle', sortable: false },
                    { text: 'Keywords / Tags', value: 'tags', sortable: false },
                ],
                dialog: false,
            }
        },
        computed: {
            ...mapGetters({
                categories: 'getCategories'
            }),
        },
        created: async function() {
            await this.viewCategories();
        },
        methods: {
            ...mapActions({
                viewCategories: 'GET_CATEGORIES',
                postCategory: 'ADD_CATEGORY',
            }),
            addCategory() {
                this.postCategory({title: this.title});
                this.dialog = false;
            }
        },
    }
</script>

<style scoped>
</style>