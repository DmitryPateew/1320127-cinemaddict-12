import Abstract from "./abstract";

const createFilmLitsComented = () => {
  return (`<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2></section>`);
};

export default class ComentedListSection extends Abstract {
  _getTemplate() {
    return createFilmLitsComented();
  }
}
