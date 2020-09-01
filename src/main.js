const COUNT__FILM__CARD = 21;
const COUNT_MOST_COMMENTED_FILM = 2;
const FILM_PER_STEP = 5;

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

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const filter = generateFilter();
render(header, createUserTitle(), `beforeend`);
render(main, createMenu(filter), `beforeend`);
render(main, createSort(), `beforeend`);

render(main, createFilmSection(), `beforeend`);

const constFilmSection = document.querySelector(`.films`);
render(constFilmSection, createFilmListSection(), `beforeend`);
const filmList = document.querySelector(`.films-list`);
render(filmList, createFilmListConteiner(), `beforeend`);
const filmListConteiner = document.querySelector(`.films-list__container`);


for (let i = 0; i < Math.min(films.length, FILM_PER_STEP); i++) {
  let comments = generateListComments();
  render(filmListConteiner, createFilmCard(films[i]), `beforeend`);
  render(filmListConteiner, createPopUp(films[i], comments), `beforeend`);
}

if (films.length > FILM_PER_STEP) {
  let renderedFilmCount = FILM_PER_STEP;

  render(filmList, createShowButton(), `beforeend`);

  const loadMoreButton = filmList.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_PER_STEP)
      .forEach((film) => render(filmListConteiner, createFilmCard(film), `beforeend`));

    renderedFilmCount += FILM_PER_STEP;

    if (renderedFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

const createFilmLitsTop = () => {
  return (`  <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>  </section>`);
};
render(constFilmSection, createFilmLitsTop(), `beforeend`);
const filmTopList = document.querySelector(`.films-list--extra`);
render(filmTopList, createFilmListConteiner(), `beforeend`);
const topPoint = filmTopList.querySelector(`.films-list__container`);

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

render(constFilmSection, createFilmLitsComented(), `beforeend`);
const filmComentedLists = document.querySelectorAll(`.films-list--extra`);
const filmComentedList = filmComentedLists[1];
render(filmComentedList, createFilmListConteiner(), `beforeend`);
const comentedPoint = filmComentedList.querySelector(`.films-list__container`);

for (let i = 0; i < COUNT_MOST_COMMENTED_FILM; i++) {
  render(comentedPoint, createFilmCard(films[i]), `beforeend`);
}

let filmCountPosition = document.querySelector(`.footer__statistics`);
filmCountPosition.textContent = COUNT__FILM__CARD;
