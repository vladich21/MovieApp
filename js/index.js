import { openModal } from "./modal.js";
import {showError, getClassByRate, getFormattedRating} from "./helpers.js"
import { API_KEY, API_URL_POPULAR, API_URL_SEARCH, API_URL_TOP_250_TV_SHOWS } from "./api.js";
import {getMoviesBySearch} from "./search.js";
import { loadMovies, setupPagination } from "./pagination.js";
import { displayMovies } from "./cardsMovie.js";

export async function getMovies(page) {
  const url = `${API_URL_POPULAR}&page=${page}`;
  try {
      const response = await fetch(url, {
          headers: {
              "Content-type": "application/json",
              "X-API-KEY": API_KEY,
          },
      });
      const responseData = await response.json();
			// console.log(responseData);
			
      return responseData.items;
  } catch (error) {
		console.error("Error fetching movies:", error);
      showError("Failed to fetch movies. Please try again.");
  }
}

const titleElement = document.getElementById('page-title');

document.getElementById('popular-series').addEventListener('click', async (e) => {
	e.preventDefault();
	
	titleElement.textContent = 'Popular Series';

	const series = await getTopTvShows();

	if(series && series.length > 0) {
		displayMovies(series);
	}else{
		showError('Популярные новинки фильмов не найдены. ')
	}
})

async function getTopTvShows() {
  const url = `${API_URL_TOP_250_TV_SHOWS}`;
  try {
      const response = await fetch(url, {
          headers: {
              "Content-type": "application/json",
              "X-API-KEY": API_KEY,
          },
      });
      const responseData = await response.json();
			console.log(responseData);
			
      return responseData.items;
  } catch (error) {
		console.error("Error fetching movies:", error);
      showError("Failed to fetch movies. Please try again.");
  }
}

loadMovies();
setupPagination()