import {createElement} from "../utils";

const createFilmListSection = () => {
  return (`<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2></section>`);
};
export default class FilmListSection {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (createFilmListSection());
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
