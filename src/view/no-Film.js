import {createElement} from "../utils";

const createNoFilm = () => {
  return (`<h2 class="films-list__title">There are no movies in our database</h2>`);
};

export default class NoFilm {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (createNoFilm());
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