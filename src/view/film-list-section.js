import Abstract from "./abstract";

const createFilmListSection = () => {
  return (`<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2></section>`);
};
export default class FilmListSection extends Abstract {

  _getTemplate() {
    return (createFilmListSection());
  }
}
