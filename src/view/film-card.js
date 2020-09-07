import {transleteTimeInHours} from "../utils.js";
import {createElement} from "../utils";

const createFilmCard = (film) => {
  const {title, totalRating, poster, runtime, release, genre, description} = film;
  let normalTime = transleteTimeInHours(runtime);
  return (`<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${release.date}</span>
            <span class="film-card__duration">${normalTime}</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">5 comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`);
};

export default class FilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  _getTemplate() {
    return (createFilmCard(this._film));
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
