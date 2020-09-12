import Abstract from "./abstract";

const createFilmLitsTop = () => {
  return (`<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>  </section>`);
};

export default class TopListSection extends Abstract {
  _getTemplate() {
    return (createFilmLitsTop());
  }
}
