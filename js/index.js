import { openModal } from "./modal.js";
import {showError} from "./helpers.js"
import { API_URL_POPULAR, API_URL_TOP_250_TV_SHOWS } from "./api.js";
import {getMoviesBySearch} from "./search.js";
import { loadMovies, setupPagination } from "./pagination.js";
import { displayMovies } from "./cardsMovie.js";
import { MoviesApi } from './MoviesApi.js'; 
import { createObservable } from "./createObservable.js";


const moviesApi = new MoviesApi();

// Создаем объект-наблюдатель
const movieObservable = createObservable([]); 

movieObservable.subscribe(displayMovies);

// Обработчик для загрузки популярных сериалов
document.getElementById('popular-series').addEventListener('click', async (e) => {
	e.preventDefault();
	const titleElement = document.getElementById('page-title');
	titleElement.textContent = 'Popular Series';

	try {
		const series = await moviesApi.getTopTvShows(); 
		if (series && series.length > 0) {
			movieObservable.setState(series)
		} else {
			showError('Популярные сериалы не найдены.');
		}
	} catch (error) {
		console.error('Ошибка при загрузке сериалов:', error);
	}
});

// Загрузка популярных фильмов при инициализации
async function initPopularMovies() {
  try {
    const movies = await moviesApi.getMovies(1); // Получаем первую страницу популярных фильмов
    if (movies && movies.length > 0) {
      movieObservable.setState(movies)
    } else {
      console.error('Нет фильмов для отображения.'); // Обработка случая, когда нет фильмов
    }
  } catch (error) {
    console.error('Ошибка при загрузке популярных фильмов:', error); // Логируем ошибку
  }
}
// Инициализация
loadMovies();
setupPagination();
initPopularMovies();