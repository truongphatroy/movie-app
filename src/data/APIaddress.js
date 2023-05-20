/* Defined the variable for url */
export const API_KEY = "efc42443a635b574db4a8d6df09af92f";
export const requests = {
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};
// for banner
export const BannerImageUrl = `https://image.tmdb.org/t/p/original/`;
// for image list
export const imageUrl = `https://image.tmdb.org/t/p/w342/`;
// for image of original list
export const originalImageUrl = `https://image.tmdb.org/t/p/original/`;
// for call video
export const videoUrl = `https://api.themoviedb.org/3/movie/`;
