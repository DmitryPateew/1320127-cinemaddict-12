import {createElement} from "../utils";

const createFilmLitsTop = () => {
  return (`<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>  </section>`);
};

export default class TopListSection {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (createFilmLitsTop());
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
