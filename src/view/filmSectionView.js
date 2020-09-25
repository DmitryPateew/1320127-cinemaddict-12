import AbstractView from "./abstractView";

const createFilmSection = () => {
  return (`<section class="films"></section>`);
};

export default class FilmSectionView extends AbstractView {
  _getTemplate() {
    return (createFilmSection());
  }
}
