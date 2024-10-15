import { displayMovies } from './cardsMovie.js'; 
import {MoviesApi} from "./MoviesApi.js"


const moviesApi = new MoviesApi();

let currentPage = 1;
let totalPages = 13;
function updatePageInfo() {
  const pageInfo = document.getElementById('page-info');
  pageInfo.textContent = `Page ${currentPage}`;
}

async function loadMovies() {
  const savedPage = localStorage.getItem('currentPage');
  if (savedPage) {
    currentPage = parseInt(savedPage, 10);
  }
  const loader = document.querySelector('.loader');
  loader.style.display = 'block'

  try {
    // Вызов метода getMovies через экземпляр moviesApi
    const movies = await moviesApi.getMovies(currentPage); 
    if (movies) {
      loader.style.display = 'none';
      displayMovies(movies);
      updatePageInfo();
      updateButtons();
    }
  } catch (error) {
    loader.style.display = 'none';
    console.error('Failed to load movies:', error);
  }
}

function updateButtons() {
  document.getElementById('prev').disabled = currentPage === 1;
  document.getElementById('next').disabled = currentPage === totalPages;
}

function setupPagination() {
  document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      localStorage.setItem('currentPage', currentPage);
      loadMovies();
    }
    updateButtons();
  });

  document.getElementById('next').addEventListener('click', () => {
    if(currentPage < totalPages){
      currentPage++;
      localStorage.setItem('currentPage', currentPage);
      loadMovies();
      updateButtons();
    }
  });
}

export { loadMovies, setupPagination, updateButtons };