import AbstractView from "./abstractView";

const createFilmListCommented = () => {
  return (`<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2></section>`);
};

export default class CommentedListSectionView extends AbstractView {
  _getTemplate() {
    return createFilmListCommented();
  }
}
