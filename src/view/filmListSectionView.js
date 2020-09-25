import AbstractView from "./abstractView";

const createFilmListSection = () => {
  return (`<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2></section>`);
};
export default class FilmListSectionView extends AbstractView {

  _getTemplate() {
    return (createFilmListSection());
  }
}
