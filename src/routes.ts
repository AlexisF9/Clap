import Home from "./pages/Home.vue";
import NotFound from "./pages/NotFound.vue";
import SingleMovie from "./pages/SingleMovie.vue";
import SinglePerson from "./pages/SinglePerson.vue";
import SingleTv from "./pages/SingleTv.vue";
import SingleSeason from "./pages/SingleSeason.vue";
import Movies from "./pages/Movies.vue";
import Series from "./pages/Series.vue";
import Search from "./pages/Search.vue";

export const defaultTitle = 'Clap'

export const routes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },
    {
        path: '/films',
        component: Movies,
        name: 'movies',
        meta: { title: "Films" }
    },
    {
        path: '/series',
        component: Series,
        name: 'series',
        meta: { title: "Séries" }
    },
    {
        path: '/film/:id',
        component: SingleMovie,
        name: 'single-movie'
    },
    {
        path: '/search',
        component: Search,
        name: 'search',
        meta: { title: "Recherche" }
    },
    {
        path: '/serie/:id',
        children: [
            {
                path: '',
                component: SingleTv,
                name: 'single-tv',
            },
            {
                path: 'saison/:season_number',
                component: SingleSeason,
                name: 'single-season'
            }
        ]
    },
    {
        path: '/person/:id',
        component: SinglePerson,
        name: 'single-person'
    },
    {
        path: '/404',
        component: NotFound,
        name: 'not-found',
        meta: { title: "404" }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: { path: '/404' }
    },
]