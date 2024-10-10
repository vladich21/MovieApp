import { getClassByRate, getFormattedRating } from "./helpers.js";
import { openModal } from "./modal.js";

export function createMovieElement(movie) {
  const movieEl = document.createElement("div");
  movieEl.classList.add("movie");

  const rating = movie.rating || movie.ratingImdb;
  movieEl.innerHTML = `
  <div class="movie__cover-inner">
      <img src="${movie.posterUrlPreview}" alt="${movie.nameRu || movie.nameEn || 'No Title'}" class="movie__cover" />
      <div class="movie__cover--darkened"></div>
  </div>
  <div class="movie__info">
      <div class="movie__title">${movie.nameRu || movie.nameEn}</div>
      <div class="movie__category">${movie.genres.map(genre => genre.genre).join(", ")}</div>
      <div class="movie__average movie__average--${getClassByRate(rating)}">
        ${getFormattedRating(rating)}
      </div>
  </div>`;

  movieEl.addEventListener("click", () => openModal(movie.kinopoiskId));
  return movieEl;
}

export function displayMovies(data) {
  const moviesEl = document.querySelector(".movies");
  moviesEl.innerHTML = ""; 

  data.forEach((movie) => {
    const movieEl = createMovieElement(movie);
    moviesEl.appendChild(movieEl);
  });
}
