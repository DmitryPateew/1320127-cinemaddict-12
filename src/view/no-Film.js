import Abstract from "./abstract";

const createNoFilm = () => {
  return (`<h2 class="films-list__title">There are no movies in our database</h2>`);
};

export default class NoFilm extends Abstract {

  _getTemplate() {
    return (createNoFilm());
  }
}
