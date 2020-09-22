import {COUNT__FILM__CARD} from "./consant.js";

import {generateMovie} from "./mock/movie.js";
import {render} from "./utils/render";
import UserTitleView from "./view/user-title.js";
import FilmSectionView from "./view/film-section";
import BoardPresenter from "./presenter/board";
import FilmsModel from "./model/films";
import FilterModel from "./model/filter";
import FilterPresenter from "./presenter/filter";

const films = new Array(COUNT__FILM__CARD).fill().map(generateMovie);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

render(headerElement, new UserTitleView());

const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);
filterPresenter.init();


const filmSectionView = new FilmSectionView();
render(mainElement, filmSectionView);

const boardPresenter = new BoardPresenter(filmSectionView, filmsModel, filterModel);
boardPresenter.init();

const filmCountPositionElement = document.querySelector(`.footer__statistics`);
filmCountPositionElement.textContent = films.length;
