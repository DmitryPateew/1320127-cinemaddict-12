import {createElement} from "../utils";


const createFilmListСontainer = () => {
  return (`<div class="films-list__container"></div>`);
};

export default class FilmListContainer {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (createFilmListСontainer());
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
