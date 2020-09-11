import Abstract from "./abstract";

const createShowButton = () => {
  return (`<button class="films-list__show-more">Show more</button>`);
};

export default class ShowButton extends Abstract {
  constructor() {
    super();
  }

  _getTemplate() {
    return createShowButton();
  }

  _clickHandler(callback, evt) {
    evt.preventDefault();
    callback();
  }

  setClickHandler(callback) {
    this.getElement().addEventListener(`click`, this._clickHandler.bind(this, callback));
  }
}
