import { YOUTUBE_API_KEY, YOUTUBE_API_BASE_URL } from '../../config/env'
import axios from "axios";

const initialState = {
    video: [],
};

const getters = {
    getVideo: state => {
        return state.video;
    }
};

const mutations = {
    SET_VIDEO_MUTATION: (state, {data}) => {
        state.video = data;
    }
};

const actions = {
    GET_VIDEO: async ({commit}, params = {}) => {
        const defaultParams = {
            part: 'snippet',
            type: 'video',
            order: 'viewCount',
            maxResults: 12,
            q: '',
            key: YOUTUBE_API_KEY,
        }

        let data = await axios({
                url: `${YOUTUBE_API_BASE_URL}videos`,
                params: {
                    ...defaultParams,
                    ...params
                },
                method: "GET"
            })

            console.log("dtaaaa", data)

        if(data) {
            commit('SET_VIDEO_MUTATION', { data: data.data.items[0] })
        }
    }
};

export default{
    state:initialState,
    actions,
    mutations,
    getters
}



// getRateList({ commit }, list) {
//     return axios({
//       url: "/rate/list?order_by=created_on&order_dir=desc",
//       params: {
//         page: list.page || '0',
//         per_page: list.per_page || 10,
//         mobile_network_uuid: list.mobileNetworkId || '',
//         type: list.type || '',
//         rate_table_type: list.rate_table_type || null,
//         vendor_uuid: list.vendor_uuid || '',
//         rate_table_uuid: list.rate_table_uuid || '',
//         code: list.code || '',
//         vendor_product_uuid: list.vendor_product_uuid || '',
//       },
//       method: "GET"
//     }).then(res => {
//       const {items: rates, total, per_page} = res.data.payload;
//       commit('SET_ALL_RATES', {rates, total, per_page})
//       return res.data.payload;
//     });
//   },
//   getRate({ commit }, id) {
//     return axios({
//       url: "/rate/" + id,
//       method: "GET"
//     }).then(res => {
//       const rate = res.data.payload;
//       commit('SET_RATE', rate)
//       return res.data.payload;
//     });
//   },
//   addRate({ commit }, data) {
//     return axios({
//       url: "/rate",
//       data: data,
//       method: "POST"
//     })
//     .then(res => {
//       return res.data.payload;
//     })
//   },
//   deleteRate({ commit}, rate_uuid) {
//     return axios({
//       url: "/rate/" + rate_uuid ,
//       method: "DELETE"
//     })
//     .then(res => {
//       commit('REMOVE__RATE', rate_uuid);
//       return res.data.payload;
//     })
//   },
//   editRate({ commit }, list) {
//     return axios({
//       url: "/rate/" + list.rate_uuid,
//       data: list.data,
//       method: "PATCH"
//     })
//     .then(res => {
//       commit('EDIT_RATE', res.data.payload);
//       return res.data.payload;
//     });
//   },
//   updateRates({ commit }, rates) {
//     commit('UPDATE_RATES', rates);
//   },
//   resetRateState ({ commit }) {
//     commit('RESET_STATE');
//   }