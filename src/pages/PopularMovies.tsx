import { useEffect } from "react"


const PopularMovies = () => {

    useEffect(() => {
        const fetchMovies = async () => {
            const res = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
                headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGNlNDRkZDJkMWVkZjA0ODc3NmNjOWNkZWVjNDJlNyIsIm5iZiI6MTY2MjMwNjAwNi4wOTQsInN1YiI6IjYzMTRjNmQ2MGQyOTQ0MDA4MWQ5YzZkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7UxjrFoBd_k6oY1EZoAOYX51X-ueL3X246OktWEAy1s",
                },
            });
            const data = await res.json();
            console.log(data);
        };
        fetchMovies();
    }, []);


    return (
        <div>PopularMovies</div>
    )
}

export default PopularMovies