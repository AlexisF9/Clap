import {algoliasearch} from "algoliasearch";

const appID = "4JZM1RK86D";
const apiKey = "dc580b87b8cab44f44bc47cf3c442d91";
const indexName = "movies";

let data = [];
let page = 1;
let total_page = 0;
const client = algoliasearch(appID, apiKey);

try {
    const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1&region=FR', {
        headers: {Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmUxZTYyMjlhMzIzYWI2Yjc5YWExMTZlNjAxZmY1NiIsIm5iZiI6MTcyNTk3NzI2Ny4wNTUyMTUsInN1YiI6IjYxNzE2MTJiMWQwMTkxMDA0NDFiMjQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.am3mQMPjEmient4GJAl8eepEATLbo7_znzFqUnTZ_MI`}
    });
    const res = await response.json()
    data = res.results
    page = res.page
    total_page = res.total_pages
    //console.log(res)
} catch (err) {
    console.log(err.toString())
}

if (data && total_page) {

    for (let i = 1; i < total_page; i++) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=${i + 1}&region=FR`, {
                headers: {Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmUxZTYyMjlhMzIzYWI2Yjc5YWExMTZlNjAxZmY1NiIsIm5iZiI6MTcyNTk3NzI2Ny4wNTUyMTUsInN1YiI6IjYxNzE2MTJiMWQwMTkxMDA0NDFiMjQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.am3mQMPjEmient4GJAl8eepEATLbo7_znzFqUnTZ_MI`}
            });
            const res = await response.json()
            data.push(...res.results)
        } catch (err) {
            console.log(err.toString())
        }
    }

    data.reverse().forEach(async (element) => {
        const { taskID } = await client.saveObject({
            indexName,
            body: {
                id: element.id,
                title: element.title,
                genre_ids: element.genre_ids,
                release_date: element.release_date,
                vote_average: Math.round(element.vote_average * 10) / 10,
                vote_count: element.vote_count,
                backdrop_path: element.backdrop_path,
                poster_path: element.poster_path
            },
        });

        await client.waitForTask({
            indexName,
            taskID,
        });
    })

   //const { results } = await client.search({
   //    requests: [
   //        {
   //            indexName
   //        },
   //    ],
   //});
}
