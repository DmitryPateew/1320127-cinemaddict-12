import {createElement} from "../utils";

const createShowButton = () => {
  return (`<button class="films-list__show-more">Show more</button>`);
};

export default class ShowButton {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (createShowButton());
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
