import Vue from 'vue';
import Vuex from 'vuex';
import video from './modules/video.js';
import youtubeApi from './modules/youtubeApi';
import category from './modules/category';

Vue.use(Vuex)

export default new Vuex.Store({
   modules: {
      video,
      youtubeApi,
      category,
   }
})