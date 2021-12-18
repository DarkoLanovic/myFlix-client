export const SET_MOVIES = 'SET_MOVIES';  //initializes the movies list with movies

export default function setMovies(value) {
    return { 
        type: SET_MOVIES, 
        value
    };
}


