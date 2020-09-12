import Abstract from "./abstract";

const createFilmSection = () => {
  return (`<section class="films"></section>`);
};

export default class FilmSection extends Abstract {
  _getTemplate() {
    return (createFilmSection());
  }
}
