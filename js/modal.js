import{API_KEY, API_URL_POPULAR, API_URL_SEARCH, API_URL_MOVIE_DETAILS, API_URL_MOVIE_STILL, API_URL_TOP_250_TV_SHOWS} from "./api.js"

const modalEl = document.getElementById("modal");

async function openModal(id) {
    const response = await fetch(API_URL_MOVIE_DETAILS + id, {
        headers: {
            "Content-type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });

    const responseData = await response.json();

    const secondResponse = await fetch(API_URL_MOVIE_STILL.replace("1", id), {
        headers: {
            "Content-type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const secondResponseData = await secondResponse.json();

    modalEl.innerHTML = `
        <div class="modal__card">
            <div class="modal__button-close">
                <button type="button" class="modal__button-close"><img src="./img/Vector.svg" alt="" /></button>
            </div>
            <img class="modal__movie-backdrop" src="${responseData.posterUrl}" alt="img" />
            <h2>
                <span class="modal__movie-title">${responseData.nameRu || responseData.nameEn} ${responseData.year}</span>
                <span class="modal__movie-release-rating">Рейтинг ${responseData.ratingImdb}</span>
                <p class="modal__movie-overview">${responseData.description}</p>
            </h2>
            <div class="modal__button">
                <button type="button" class="modal__button-watch"><a href="${responseData.webUrl}">Смотреть фильм</a></button>
            </div>
            <ul class="modal__movie-info">
                <h3>О фильме</h3>
                <li class="modal__movie-genre"><b>Жанр:</b>${responseData.genres.map((el) => `<span>${el.genre}</span>`).join(', ')}</li>
                ${responseData.filmLength ? `<li class="modal__movie-runtime"><b>Время:</b> ${responseData.filmLength} минут</li>` : ''}
                <li class="modal__movie-country"><b>Страна:</b> ${responseData.countries.map((el) => `<span>${el.country}</span>`).join(', ')}</li>
            </ul>
            <div class="modal__slider">
                <button class="modal__btn slider__btn-prev">❮</button>
                <div class="slider__container"> Кадры из фильма
                    ${createSliderImages(secondResponseData.items)}
                </div>
                <button class="modal__btn slider__btn-next">❯</button>
            </div>
        </div>
    `;
    
    document.body.classList.add("stop-scrolling");
    modalEl.classList.add("modal--show");
   

    const btnClose = document.querySelector(".modal__button-close");
    btnClose.addEventListener("click", () => closeModal());

    let currentSlide = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll('.slider__image');
        slides.forEach(slide => slide.style.display = 'none');
        slides[index].style.display = 'block';
    }

    document.querySelector('.slider__btn-prev').addEventListener('click', () => {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : document.querySelectorAll('.slider__image').length - 1;
        showSlide(currentSlide);
    });

    document.querySelector('.slider__btn-next').addEventListener('click', () => {
        currentSlide = (currentSlide < document.querySelectorAll('.slider__image').length - 1) ? currentSlide + 1 : 0;
        showSlide(currentSlide);
    });

    showSlide(currentSlide);
}

function createSliderImages(images) {
    return images.map(image => `<img class="slider__image" src="${image.previewUrl}" alt="framesMovie" style="display: none;" />`).join('');
}

function closeModal() {
  modalEl.classList.add("modal--hide");  
  
  setTimeout(() => {
      modalEl.classList.remove("modal--show", "modal--hide");  
      document.body.classList.remove("stop-scrolling");
  }, 300); 
}

window.addEventListener("click", (e) => {
    if (e.target === modalEl) {
        closeModal();
    }
});

window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
        closeModal();
    }
});

export{ openModal };
