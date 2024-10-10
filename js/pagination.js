import { displayMovies } from './cardsMovie.js'; 
import {getMovies} from "./index.js"

let currentPage = 1;

function updatePageInfo() {
  const pageInfo = document.getElementById('page-info');
  pageInfo.textContent = `Page ${currentPage}`;
}

async function loadMovies() {
  const savedPage = localStorage.getItem('currentPage');
  if (savedPage) {
    currentPage = parseInt(savedPage, 10);
  }

  const movies = await getMovies(currentPage);
  if (movies) {
    displayMovies(movies);
    updatePageInfo();
  }
}

function updateButtons() {
  document.getElementById('prev').disabled = currentPage === 1;
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
    currentPage++;
    localStorage.setItem('currentPage', currentPage);
    loadMovies();
    updateButtons();
  });
}

export { loadMovies, setupPagination, updateButtons };
