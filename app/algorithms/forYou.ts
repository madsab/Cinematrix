import { Movie } from "../types/Movie";



const calculateForYou = (movies: Movie[], userWathcedMoviesID: string[]) => {

    movies.sort((a, b) => {
        if(a.rank - b.rank > 2) return -1;
        if(a.rank - b.rank < -2) return -1;
        return 0;
    });
    const userWatchedMovies = (movies).filter((movie: Movie) => {
        return userWathcedMoviesID.includes(movie.imdbid);
    }) as Movie[];

    //Count the genres in movies the user has watched
    let total = 0;
    const genreCount = {} as { [key: string]: number };
    userWatchedMovies.forEach((movie: Movie) => {
        movie.genre.forEach((g: string) => {
            if (genreCount[g]) {
                genreCount[g]++;
                total++;
            } else {
                genreCount[g] = 1;
                total++;
            }
        });
    });

    // Calculate how many of each genre to show the user
    const howManyOfEach = findMovInGenre(genreCount, total)
    console.log("How many of each", howManyOfEach);

    const filteredMovies: Movie[] = [];

// Iterate over each genre count and filter movies accordingly
    Object.keys(howManyOfEach).forEach(genre => {
        const count = howManyOfEach[genre];
        const genreMovies = movies.filter(movie => movie.genre.includes(genre) && !(userWathcedMoviesID.includes(movie.imdbid))).slice(0, count);
        filteredMovies.push(...genreMovies);
});

    console.log("Filtered movies", Array.from(new Set(filteredMovies)));

    return Array.from(new Set(filteredMovies));
}

const findMovInGenre = (genreCount: { [key: string]: number }, total: number) => {
    const NUMBER_OF_MOVIES = 25;
    const howManyOfEach = {} as { [key: string]: number };
    for (const genre in genreCount) {
        let decimal = (genreCount[genre] / total);
        howManyOfEach[genre] =  Math.floor(decimal * NUMBER_OF_MOVIES)
    }
    return howManyOfEach;
}

export { calculateForYou };