"use strict";
const COUNT__FILM__CARD = 5;

const createUserTitle = () => {
  return (` <section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`);
};

const createMenu = () => {
  return (`<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`);
};

const createSort = () => {
  return (`<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`);
};


const createFilmCard = () => {
  return (` <article class="film-card">
          <h3 class="film-card__title">The Dance of Life</h3>
          <p class="film-card__rating">8.3</p>
          <p class="film-card__info">
            <span class="film-card__year">1929</span>
            <span class="film-card__duration">1h 55m</span>
            <span class="film-card__genre">Musical</span>
          </p>
          <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
          <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
          <a class="film-card__comments">5 comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`);
};

const createShowButton = () => {
  return (`<button class="films-list__show-more">Show more</button>`);
};

const createTopRatingFilm = () => {
  return (` <article class="film-card">
          <h3 class="film-card__title">The Man with the Golden Arm</h3>
          <p class="film-card__rating">9.0</p>
          <p class="film-card__info">
            <span class="film-card__year">1955</span>
            <span class="film-card__duration">1h 59m</span>
            <span class="film-card__genre">Drama</span>
          </p>
          <img src="./images/posters/the-man-with-the-golden-arm.jpg" alt="" class="film-card__poster">
          <p class="film-card__description">Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…</p>
          <a class="film-card__comments">18 comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  film-card__controls-item--active">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`);
};

const createMostCommentedFilm = () => {
  return (` <article class="film-card">
          <h3 class="film-card__title">Santa Claus Conquers the Martians</h3>
          <p class="film-card__rating">2.3</p>
          <p class="film-card__info">
            <span class="film-card__year">1964</span>
            <span class="film-card__duration">1h 21m</span>
            <span class="film-card__genre">Comedy</span>
          </p>
          <img src="./images/posters/santa-claus-conquers-the-martians.jpg" alt="" class="film-card__poster">
          <p class="film-card__description">The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…</p>
          <a class="film-card__comments">465 comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
          </form>
        </article>`);
};

const createFilmSection = () => {
  return (`<section class="films"></section>`);
};

const createFilmListSection = () => {
  return (`<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2></section>`);
};

const createFilmListConteiner = () => {
  return (`<div class="films-list__container"></div>`);
};

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
