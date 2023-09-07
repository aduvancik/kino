const apiKey = "e2cafdb9-cb7a-4aa2-816d-4f607f9aa257";
const apiUrl = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const apiUrlSearch = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="

getMovies(apiUrl);
async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "aplication/json",
      "X-API-KEY": apiKey,
    },
  })
  const respData = await resp.json();
  showMovies(respData);
}
const getClassByRating = (rating) => {
  if(rating >= 7) return "green"
  else if(6 < rating) return "orange"
  else return "red"
}
const showMovies = (data) => {
  document.querySelector(".movies").innerHTML = "";
  const moviesEl = document.querySelector(".movies");

  data.films.forEach(movie => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <div class="movie__cover-inner">
              <img
                class="movie_cover"
                src="${movie.posterUrlPreview}"
                alt="${movie.nameRu}"
              />
              <div class="movie__cover--darkened"></div>
            </div>
            <div class="movie__info">
              <div class="movie__title">${movie.nameRu}</div>
              <div class="movie__category">${movie.genres.map((genre) => ` ${genre.genre}`)}</div>
              ${movie.rating !== "null" && movie.rating !== "undefined"? 
              `<div class="movie__average movie__average--${getClassByRating(movie.rating)}">${movie.rating}</div>` : ''}

            </div>
    `;
    moviesEl.appendChild(movieEl);
  });
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit",(e) =>{
  e.preventDefault();

  const apiSearchUrl = `${apiUrlSearch}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);
    search.value = "";
  }

})