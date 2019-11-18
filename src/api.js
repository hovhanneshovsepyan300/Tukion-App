import { _get, _post, _patch } from './utils/http'

/*-------------- Videos ---------------*/
export const getVideos = (data) => _get('video/list', data);
export const addVideo = (data) => _post('video', data);
export const editVideo = (data) => _patch(`video/${data._id}`, data);
export const downloadVideo = (data) => _get(`video/download/${data.id}`, data);

/*-------------- Categories ---------------*/
export const getCategories = (data) => _get('category/list', data);
export const addCategory = (data) => _post('category', data);
