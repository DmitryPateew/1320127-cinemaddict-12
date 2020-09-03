import {COUNT__FILM__CARD} from "./consant.js";
import {COUNT_MOST_COMMENTED_FILM} from "./consant.js";
import {FILM_PER_STEP} from "./consant.js";

import {createUserTitle} from "./view/user-title.js";
import {createMenu} from "./view/site-menu.js";
import {createSort} from "./view/sort.js";
import {createFilmCard} from "./view/film-card.js";
import {createShowButton} from "./view/show-button.js";
import {createFilmSection} from "./view/containers.js";
import {createFilmListSection} from "./view/containers.js";
import {createFilmListConteiner} from "./view/containers.js";
import {generateMovie} from "./mock/movie.js";
import {createPopUp} from "./view/pop-up.js";
import {render} from "./utils.js";
import {generateFilter} from "./mock/filter.js";
import {generateListComments} from "./mock/coment.js";


const films = new Array(COUNT__FILM__CARD).fill().map(generateMovie);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const filter = generateFilter();
render(headerElement, createUserTitle(), `beforeend`);
render(mainElement, createMenu(filter), `beforeend`);
render(mainElement, createSort(), `beforeend`);

render(mainElement, createFilmSection(), `beforeend`);

const constFilmSectionElement = document.querySelector(`.films`);
render(constFilmSectionElement, createFilmListSection(), `beforeend`);
const filmListElement = document.querySelector(`.films-list`);
render(filmListElement, createFilmListConteiner(), `beforeend`);
const filmListConteinerElement = document.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(films.length, FILM_PER_STEP); i++) {
  let comments = generateListComments();
  render(filmListConteinerElement, createFilmCard(films[i]), `beforeend`);
  render(filmListConteinerElement, createPopUp(films[i], comments), `beforeend`);
}

if (films.length > FILM_PER_STEP) {
  let renderedFilmCount = FILM_PER_STEP;
  render(filmListElement, createShowButton(), `beforeend`);
  const loadMoreButtonElement = filmListElement.querySelector(`.films-list__show-more`);
  loadMoreButtonElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_PER_STEP)
      .forEach((film) => render(filmListConteinerElement, createFilmCard(film), `beforeend`));
    renderedFilmCount += FILM_PER_STEP;
    if (renderedFilmCount >= films.length) {
      loadMoreButtonElement.remove();
    }
  });
}

const createFilmLitsTop = () => {
  return (`  <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>  </section>`);
};
render(constFilmSectionElement, createFilmLitsTop(), `beforeend`);
const filmTopListElement = document.querySelector(`.films-list--extra`);
render(filmTopListElement, createFilmListConteiner(), `beforeend`);
const topPoint = filmTopListElement.querySelector(`.films-list__container`);

const maxRatingFilm = () => {
  let copyFilm = films.slice();
  let ratingFilms = [];
  let firstMaxValue = copyFilm.reduce((prev, current) => (prev.totalRating > current.totalRating) ? prev : current);
  ratingFilms.push(firstMaxValue);
  copyFilm.splice(copyFilm.indexOf(firstMaxValue), 1);
  let secondMaxValue = copyFilm.reduce((prev, current) => (prev.totalRating > current.totalRating) ? prev : current);
  ratingFilms.push(secondMaxValue);
  return ratingFilms;
};

for (let i = 0; i < maxRatingFilm().length; i++) {
  render(topPoint, createFilmCard(maxRatingFilm()[i]), `beforeend`);
}

const createFilmLitsComented = () => {
  return (`    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2></section>`);
};

render(constFilmSectionElement, createFilmLitsComented(), `beforeend`);
const filmComentedListsElement = document.querySelectorAll(`.films-list--extra`);
const filmComentedList = filmComentedListsElement[1];
render(filmComentedList, createFilmListConteiner(), `beforeend`);
const comentedPointElement = filmComentedList.querySelector(`.films-list__container`);

for (let i = 0; i < COUNT_MOST_COMMENTED_FILM; i++) {
  render(comentedPointElement, createFilmCard(films[i]), `beforeend`);
}

let filmCountPositionElement = document.querySelector(`.footer__statistics`);
filmCountPositionElement.textContent = COUNT__FILM__CARD;
