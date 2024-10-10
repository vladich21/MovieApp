import { API_KEY, API_URL_SEARCH } from './api.js';
import { showError } from './helpers.js';
import { displayMovies } from './cardsMovie.js';

 async function getMoviesBySearch(query) {
  const url = `${API_URL_SEARCH}${query}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });
    const responseData = await response.json();
    return responseData.films;
  } catch (error) {
    showError("Failed to search movies.");
  }
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const searchQuery = search.value.trim();
	
		localStorage.setItem('searchQuery', searchQuery)
    if (searchQuery) {
        const movies = await getMoviesBySearch(searchQuery); 
        if (movies && movies.length > 0) {
            displayMovies(movies); 
        } else {
            showError("Фильмы не найдены.");
        }
        search.value = ""; 
    }
});

export{getMoviesBySearch}