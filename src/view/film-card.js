import {transleteTimeInHours} from "../utils/film";
import Abstract from "./abstract";

const createFilmCard = (film) => {
  const {title, totalRating, poster, runtime, release, genre, description, comment} = film;
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
          <a class="film-card__comments">${comment.length} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`);
};

export default class FilmCard extends Abstract {
  constructor(film) {
    super();
    this._film = film;
  }

  _getTemplate() {
    return (createFilmCard(this._film));
  }

  _clickHandler(callback, evt) {
    evt.preventDefault();
    callback();
  }

  _favoriteClickHandler(callback, evt) {
    evt.preventDefault();
    callback();
  }

  _historyClickHandler(callback, evt) {
    evt.preventDefault();
    callback();
  }

  _watchClickHandler(callback, evt) {
    evt.preventDefault();
    callback();
  }

  setClickHandler(callback) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._clickHandler.bind(this, callback));
  }

  setFavoriteClickHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler.bind(this, callback));
  }

  setHistoryClickHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._historyClickHandler.bind(this, callback));
  }

  setWatchClickHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchClickHandler.bind(this, callback));
  }
}
