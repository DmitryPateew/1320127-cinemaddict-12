const COUNT__FILM__CARD = 5;

import {createUserTitle} from "./view/user-title.js";
import {createMenu} from "./view/site-menu.js";
import {createSort} from "./view/sort.js";
import {createFilmCard} from "./view/film-card.js";
import {createShowButton} from "./view/show-button.js";
import {createTopRatingFilm} from "./view/top-rating-film.js";
import {createMostCommentedFilm} from "./view/most-commented-film.js";
import {createFilmSection} from "./view/containers.js";
import {createFilmListSection} from "./view/containers.js";
import {createFilmListConteiner} from "./view/containers.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);


render(header, createUserTitle(), `beforeend`);
render(main, createMenu(), `beforeend`);
render(main, createSort(), `beforeend`);
render(main, createFilmSection(), `beforeend`);

const constFilmSection = document.querySelector(`.films`);
render(constFilmSection, createFilmListSection(), `beforeend`);
const filmList = document.querySelector(`.films-list`);
render(filmList, createFilmListConteiner(), `beforeend`);
const filmListConteiner = document.querySelector(`.films-list__container`);
for (let i = 0; i < COUNT__FILM__CARD; i++) {
  render(filmListConteiner, createFilmCard(), `beforeend`);
}
render(filmList, createShowButton(), `beforeend`);

const createFilmLitsTop = () => {
  return (`  <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>  </section>`);
};
render(constFilmSection, createFilmLitsTop(), `beforeend`);
const filmTopList = document.querySelector(`.films-list--extra`);
render(filmTopList, createFilmListConteiner(), `beforeend`);
const topPoint = filmTopList.querySelector(`.films-list__container`);
render(topPoint, createTopRatingFilm(), `beforeend`);
render(topPoint, createTopRatingFilm(), `beforeend`);
const createFilmLitsComented = () => {
  return (`    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2></section>`);
};

render(constFilmSection, createFilmLitsComented(), `beforeend`);
const filmComentedLists = document.querySelectorAll(`.films-list--extra`);
const filmComentedList = filmComentedLists[1];
render(filmComentedList, createFilmListConteiner(), `beforeend`);
const comentedPoint = filmComentedList.querySelector(`.films-list__container`);


render(comentedPoint, createMostCommentedFilm(), `beforeend`);
render(comentedPoint, createMostCommentedFilm(), `beforeend`);
