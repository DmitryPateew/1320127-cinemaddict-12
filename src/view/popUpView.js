import AbstractView from "./abstractView";
import {EMOJI__SIZE} from "../consant";
import {formatFilmTime, formatReleaseDate} from "../utils/dateFormat";


const newComment = {
  author: ``,
  comment: null,
  date: null,
  emotion: null
};

const _genresAdd = (genres) => {
  let genresView = ``;
  for (let i = 0; i < genres.length; i++) {
    genresView += (`<span class="film-details__genre">${genres[i]}</span>`);
  }
  return genresView;
};

const createPopUp = (film) => {
  const {title, alternativeTitle, totalRating, poster, ageRating, director, writers, actors, date, countries, runtime, genres, description} = film;
  return (`<form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tbody><tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${formatReleaseDate(date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${formatFilmTime(runtime)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${countries}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
              ${_genresAdd(genres)}
            </tr>
          </tbody></table>

          <p class="film-details__film-description">
               ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
    </div>
  </form>`);
};

export default class PopUpView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._closePopupFilmDetailHandler = this._closePopupFilmDetailHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._alreadyWatchClickHandler = this._alreadyWatchClickHandler.bind(this);
    this._inWatchlistClickHandler = this._inWatchlistClickHandler.bind(this);
  }

  _getTemplate() {
    return (createPopUp(this._film));
  }


  _clickHandler(callback, evt) {
    evt.preventDefault();
    callback();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _alreadyWatchClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchClick();
  }

  _inWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.inWatchlistClick();
  }

  _closePopupFilmDetailHandler() {
    this._callback.closeFilmDetail();
  }

  setClickHandler(callback) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler.bind(this, callback));
  }

  setClosePopupFilmDetailHandler(callback) {
    this._callback.closeFilmDetail = callback;

    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closePopupFilmDetailHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setAlreadyWatchClickHandler(callback) {
    this._callback.alreadyWatchClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._alreadyWatchClickHandler);
  }

  setInWatchlistClickHandler(callback) {
    this._callback.inWatchlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._inWatchlistClickHandler);
  }


  _updateElement() {
    let prevElement = this.getElement().querySelector(`.film-details__comments-list`);
    this.getElement().querySelector(`.film-details__comments-count`).innerText = this._film.comment.length;
    this.getElement().querySelector(`.film-details__comment-input`).value = ``;
    const selectedEmojiElement = this.getElement().querySelector(`.film-details__add-emoji-label`);
    selectedEmojiElement.removeChild(selectedEmojiElement.children[0]);
    while (prevElement.firstChild) {
      prevElement.removeChild(prevElement.firstChild);
    }
    prevElement.innerHTML = this._film.comment;
  }

  restoreHandlers() {
    this.setClosePopupFilmDetailHandler(this._callback.closeFilmDetail);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setAlreadyWatchClickHandler(this._callback.alreadyWatchClick);
    this.setInWatchlistClickHandler(this._callback.inWatchlistClick);
  }

  resetView() {
    this.removeElement();
  }

  _emojiHandler(callback, evt) {
    evt.preventDefault();
    callback();
    const emojiBlockElement = evt.currentTarget.closest(`.film-details__new-comment`).querySelector(`.film-details__add-emoji-label`);
    let img = document.createElement(`img`);
    img.width = EMOJI__SIZE;
    img.heigth = EMOJI__SIZE;
    img.src = `./images/emoji/` + evt.target.value + `.png`;
    emojiBlockElement.innerHTML = ``;
    emojiBlockElement.append(img);
    newComment.emotion = evt.target.value;
  }

  setEmojiHandler(callback) {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiHandler.bind(this, callback));
  }

  _textHandler(callback, evt) {
    evt.preventDefault();
    callback();
    newComment.comment = evt.target.value;
  }

  setTextHandler(callback) {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._textHandler.bind(this, callback));
  }

  _submitHandler(callback, evt) {
    callback();
    if (evt.key === `Enter` && evt.ctrlKey) {
      newComment.date = new Date();
      this._updateElement();
    }
  }

  setSubmitHandler(callback) {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, this._submitHandler.bind(this, callback));
  }

  _deleteHandler(callback) {
    callback();
  }

  setDeleteHandler(callback) {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`click`, this._deleteHandler.bind(this, callback));
  }
}
