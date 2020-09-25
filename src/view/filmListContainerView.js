import AbstractView from "./abstractView";


const createFilmListContainer = () => {
  return (`<div class="films-list__container"></div>`);
};

export default class FilmListContainerView extends AbstractView {
  _getTemplate() {
    return (createFilmListContainer());
  }
}
