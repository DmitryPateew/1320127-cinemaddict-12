import {createElement} from "../utils";

const createFilmLitsComented = () => {
  return (`<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2></section>`);
};

export default class ComentedListSection {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createFilmLitsComented();
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
