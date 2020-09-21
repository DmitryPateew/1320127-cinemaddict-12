import {transleteTimeInHours} from "../utils/film";
import Abstract from "./abstract";
import {commentGenerate} from "./coment";
import {EMOJI__SIZE} from "../consant";


const newComment = {
  author: `test`,
  comment: null,
  date: null,
  emotion: null
};

const createPopUp = (film) => {
  const {title, alternativeTitle, totalRating, poster, ageRating, director, writers, actors, release, runtime, genre, description, comments} = film;
  let normalTime = transleteTimeInHours(runtime);
  return (`<form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

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
              <td class="film-details__cell">${release.date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${normalTime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${release.releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genre}</span>
                <span class="film-details__genre">Film-Noir</span>
                <span class="film-details__genre">Mystery</span></td>
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
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
${comments}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>`);
};

export default class PopUp extends Abstract {
  constructor(film) {
    super();
    this._film = film;
  }

  _getTemplate() {
    return (createPopUp(this._film));
  }


  _clickHandler(callback, evt) {
    evt.preventDefault();
    callback();
  }


  setClickHandler(callback) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler.bind(this, callback));
  }

  _updateElement() {
    let prevEl = this.getElement().querySelector(`.film-details__comments-list`);
    this.getElement().querySelector(`.film-details__comments-count`).innerText = this._film.comment.length;
    this.getElement().querySelector(`.film-details__comment-input`).value = ``;
    const selectedEmogi = this.getElement().querySelector(`.film-details__add-emoji-label`);
    selectedEmogi.removeChild(selectedEmogi.children[0]);
    while (prevEl.firstChild) {
      prevEl.removeChild(prevEl.firstChild);
    }
    prevEl.innerHTML = this._film.comment;
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
      this._film.comment.push(commentGenerate(newComment));
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
