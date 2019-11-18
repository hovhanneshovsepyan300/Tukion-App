import { getCategories, addCategory } from '../../api'

const initialState = {
    categories: [],
};

const getters = {
    getCategories: state => {
        return state.categories;
    }
};

const mutations = {
    SET_CATEGORIES_MUTATION: (state, {data}) => {
        state.categories = data;
    },

    ADD_CATEGORY_MUTATION: (state, {data}) => {
        state.categories = [...state.categories, data];
    }
};

const actions = {
    GET_CATEGORIES: async ({commit}) => {
        let data = await getCategories();

        if(data) {
            commit('SET_CATEGORIES_MUTATION', { data })
        }
    },
    ADD_CATEGORY: async ({commit}, category) => {
        let data = await addCategory(category);

        if(data) {
            commit('ADD_CATEGORY_MUTATION', {data});
        }
    }
};

export default{
    state:initialState,
    actions,
    mutations,
    getters
}