import {formatCommentDate} from "../utils/dateFormat";
import he from "he";
import AbstractView from "./abstractView";

const _commentGenerate = (commentData) => {
  const {author, text, date, emotion} = commentData;
  return (`<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${he.encode(text)}</p>
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
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);
  }

  _getTemplate() {
    return (_commentGenerate(this._comment));
  }

  _commentDeleteHandler(evt) {
    evt.preventDefault();
    const commentId = evt.target.dataset.commentId;
    this._callback.commentDeleteClick(commentId);
  }

  _setInnerHandlers() {
    const commentDeleteBtnElement = this.getElement().querySelector(`.film-details__comment-delete`);
    commentDeleteBtnElement.addEventListener(`click`, this._commentDeleteHandler);
  }

  setCommentDeleteHandler(callback) {
    this._callback.commentDeleteClick = callback;

    this._setInnerHandlers();
  }
}
