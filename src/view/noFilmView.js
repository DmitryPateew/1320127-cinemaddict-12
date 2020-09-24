import AbstractView from "./abstractView";

const createNoFilm = () => {
  return (`<h2 class="films-list__title">There are no movies in our database</h2>`);
};

export default class NoFilmView extends AbstractView {

  _getTemplate() {
    return (createNoFilm());
  }
}
