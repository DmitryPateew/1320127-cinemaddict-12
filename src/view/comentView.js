import {formatCommentDate} from "../utils/dateFormat";
import he from "he";
import AbstractView from "./abstractView";
import {createElement} from "../utils/render";

const _commentGenerate = (commentData) => {
  const {author, comment, date, emotion} = commentData;
  return (`  <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${he.encode(comment)}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${formatCommentDate(date)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`);
};

export default class Comment extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  _getTemplate() {
    return (_commentGenerate(this._comment));
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }
    return this._element;
  }

}
