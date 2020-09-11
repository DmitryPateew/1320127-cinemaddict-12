import Abstract from "./abstract";


const createFilmListСontainer = () => {
  return (`<div class="films-list__container"></div>`);
};

export default class FilmListContainer extends Abstract {
  _getTemplate() {
    return (createFilmListСontainer());
  }
}
