import {createElement} from "../utils";

const createFilmSection = () => {
  return (`<section class="films"></section>`);
};

export default class FilmSection {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (createFilmSection());
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
