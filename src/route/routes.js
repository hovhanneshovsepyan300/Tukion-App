import Main from '../components/pages/Main';
import Category from '../components/pages/Category';
import PageNotFound from '../components/layout/PageNotFound';

export const routes = [
    {
        path: '/', component: Main,
    },
    {
        path: '/category/:id', component: Category ,
    },
    {
        path: "*", component: PageNotFound
    }
];