<template>
    <v-app light>
        <v-content>
            <section>
                <v-data-table
                    :headers="headers"
                    :items="videos"
                    sort-by="calories"
                    class="elevation-1"
                >
                    <template v-slot:top>
                        <v-toolbar flat color="white">
                                <v-toolbar-title>Videos list</v-toolbar-title>
                                <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                ></v-divider>
                                <v-toolbar-title><a @click="$router.go(-1)">Back to list</a></v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-dialog v-model="dialog" max-width="500px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">Add Video Url</span>
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text style="height: 150px;" v-if="isAdd">
                                            <v-text-field
                                                label="Video URL"
                                                v-model="url"
                                                column
                                            ></v-text-field>
                                        </v-card-text>

                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                            <v-btn color="blue darken-1" text @click="getVideoFromYoutubeApi">Save</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                 <v-dialog v-model="dialog2" max-width="500px">
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">Edit Item</span>
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-text-field v-model="edit_video.title" label="Tilte"></v-text-field>
                                                </v-row>
                                                <v-row>
                                                    <v-text-field v-model="edit_video.description" label="Description"></v-text-field>
                                                </v-row>
                                            </v-container>
                                        </v-card-text>

                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <v-btn color="blue darken-1" text @click="dialog2 = false">Close</v-btn>
                                            <v-btn color="blue darken-1" text @click="editVideo">Save</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template>

                        
                        <template v-slot:item.url="{ item }">
                            <youtube 
                            :video-id="getId(item.url)" 
                            ref="youtube"
                            width="200"
                            height="150"></youtube>
                        </template>

                        <template v-slot:item.action="{ item }">
                            <v-card class="d-flex align-center flex-row mb-6">
                                <v-icon
                                    small
                                    class="mr-2"
                                    @click="editItem(item)"
                                >
                                    edit
                                </v-icon>
                                <i class="material-icons" @click="download(item)">
                                    arrow_downward
                                </i>
                            </v-card>
                        </template>
                </v-data-table>
            </section>
        </v-content>
    </v-app>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "Category",
        data() {
            return {
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
                    { text: 'Actions', value: 'action', sortable: false },
                ],
                url: null,
                isLoading: true,
                videoId: 'ijE1JPQSTVo',
                dialog: false,
                dialog2: false,
                isAdd: true,
                edit_video: {},
            }
        },
        computed: {
            ...mapGetters({
                video: 'getVideo',
                allVideos: 'getVideos',
            }),
            videos(){
                return this.allVideos.map((item) => {
                    let tags = item.tags.join(', ');
                    return {...item, tags}
                })
            },
            player() {
                return this.$refs.youtube.player
            },
        },
        created: async function() {
            this.resetState();
            await this.viewVideos({categoryId: this.$route.params.id});
            this.isLoading = false;
        },
        methods: {
            ...mapActions({
                viewVideo: 'GET_VIDEO',
                postVideo: 'ADD_VIDEO',

                viewVideos: 'GET_VIDEOS',
                patchVideo: 'EDIT_VIDEO',
                resetState: 'RESET_STATE',
                downloadVideo: 'DOWNLOAD_VIDEO',
            }),
            playing() {
                console.log('we are watching!!!')
            },
            getId (url) {
                return this.$youtube.getIdFromUrl(url)
            },
            getVideoIdFromUrl(url) {
                // var myregexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i
                // var str = 'https://www.youtube.com/watch?v=9sWEecNUW-o';
                const str = url || this.url;
                var video_id = str.split('v=')[1];
                if(!video_id) { return false}
                var ampersandPosition = video_id.indexOf('&');

                if(ampersandPosition != -1) {
                    video_id = video_id.substring(0, ampersandPosition);
                }

                return video_id || false;
            },
            getVideoFromYoutubeApi: async function() {
                const id = this.getId(this.url);
                
                if(!id) {
                    console.log("Entered url id not correct youtube video url.");
                    return
                }

                await this.viewVideo({id});
                this.addVideo();
                this.dialog = false;
            },
            addVideo: async function() {
                const snippet = this.video.snippet;

                const data = {
                    url: this.url,
                    channelTitle: snippet.channelTitle,
                    description: snippet.description,
                    tags: snippet.tags,
                    tumbnail_url: snippet.thumbnails.default.url,
                    title: snippet.title,
                    categoryId: this.$route.params.id,
                }

                await this.postVideo(data);
            },
            editItem (item) {
                const { title, description, _id } = item;
                this.edit_video = { title, description, _id };
                this.dialog2 = true;
            },
            editVideo: async function() {
                await this.patchVideo(this.edit_video);
                this.dialog2 = false
            },
            download: async function(item) {
                // await this.downloadVideo(this.getId(item.url));
                window.open(`http://localhost:5000/api/video/download/${this.getId(item.url)}`);
            }
        },
    }
</script>

<style scoped>
</style>