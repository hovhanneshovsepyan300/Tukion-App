import { getVideos, addVideo, editVideo, downloadVideo } from '../../api'

const initialState = {
    videos: [],
};

const getters = {
    getVideos: state => {
        return state.videos;
    }
};

const mutations = {
    SET_VIDEOS_MUTATION: (state, {data}) => {
        state.videos = data;
    },

    ADD_VIDEO_MUTATION: (state, {data}) => {
        state.videos = [...state.videos, data];
    },
    EDIT_VIDEO_MUTATION: (state, {data}) => {
        state.videos = state.videos.map(item => {
            if(item._id === data._id) {
                return data;
            }
            return item;
        })
    },
    DOWNLOAD: () => {
        console.log("aaaa");
    },
    RESET_STATE: (state) => {
        state.videos = [];
    }
};

const actions = {
    GET_VIDEOS: async ({commit}, { categoryId }) => {
        let data = await getVideos({ categoryId });

        if(data) {
            commit('SET_VIDEOS_MUTATION', { data })
        }
    },
    ADD_VIDEO: async ({commit}, video) => {
        let data = await addVideo(video);

        if(data) {
            commit('ADD_VIDEO_MUTATION', {data});
        }
    },
    EDIT_VIDEO: async ({commit}, video) => {
        let data = await editVideo(video);

        if(data) {
            commit('EDIT_VIDEO_MUTATION', {data});
        }
    },
    DOWNLOAD_VIDEO: async ({commit}, id) => {
        console.log('id',id)
        let data = await downloadVideo({id});

        if(data) {
            commit('DOWNLOAD');
            console.log("download reeeeessss", data)
            return data;
        }
    },
    RESET_STATE: async({commit}) => {
        commit('RESET_STATE')
    }
};

export default{
    state:initialState,
    actions,
    mutations,
    getters
}