import Home from "./pages/Home.vue";
import NotFound from "./pages/NotFound.vue";
import SingleMovie from "./pages/SingleMovie.vue";
import SinglePerson from "./pages/SinglePerson.vue";
import SingleTv from "./pages/SingleTv.vue";
import SingleSeason from "./pages/SingleSeason.vue";
import Movies from "./pages/Movies.vue";
import Series from "./pages/Series.vue";
import Test from "./pages/Test.vue";

export const routes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },
    {
        path: '/films',
        component: Movies,
        name: 'movies'
    },
    {
        path: '/series',
        component: Series,
        name: 'series'
    },
    {
        path: '/film/:id',
        component: SingleMovie,
        name: 'single-movie'
    },
    {
        path: '/test',
        component: Test,
        name: 'test'
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
        path: '/:pathMatch(.*)*',
        component: NotFound
    },
]