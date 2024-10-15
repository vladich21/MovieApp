// MoviesAPI.js
import { ApiService } from './ApiService.js';
import { API_KEY, API_URL_POPULAR, API_URL_TOP_250_TV_SHOWS,API_URL_SEARCH } from './api.js'; // ваши URL и ключ

export class MoviesApi {
  constructor() {
    this.apiService = new ApiService('', { "X-API-KEY": API_KEY });
  }

  // Метод для получения популярных фильмов
  async getMovies(page) {
    try {
      const responseData = await this.apiService.get(`${API_URL_POPULAR}&page=${page}`);
      console.log(responseData);
      return responseData.items; // Предполагаем, что responseData.items содержит массив фильмов
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error; // Пробрасываем ошибку дальше
    }
  }

  // Метод для получения популярных сериалов
  async getTopTvShows() {
    try {
      const responseData = await this.apiService.get(API_URL_TOP_250_TV_SHOWS);
      console.log(responseData);
      return responseData.items; // Предполагаем, что responseData.items содержит массив сериалов
    } catch (error) {
      console.error("Error fetching TV shows:", error);
      throw error; // Пробрасываем ошибку дальше
    }
  }
}
