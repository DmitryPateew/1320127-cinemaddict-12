import {COUNT__FILM__CARD} from "./consant.js";

import {generateMovie} from "./mock/movie.js";
import {render} from "./utils/render";
import {generateFilter} from "./mock/filter.js";
import UserTitleView from "./view/user-title.js";
import SiteMenuView from "./view/site-menu.js";
import FilmSectionView from "./view/film-section";
import BoardPresenter from "./presenter/board";

const films = new Array(COUNT__FILM__CARD).fill().map(generateMovie);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const filter = generateFilter();
render(headerElement, new UserTitleView());
render(mainElement, new SiteMenuView(filter));

const filmSectionView = new FilmSectionView();
render(mainElement, filmSectionView);

const boardPresenter = new BoardPresenter(filmSectionView);
boardPresenter.init(films);

const filmCountPositionElement = document.querySelector(`.footer__statistics`);
filmCountPositionElement.textContent = COUNT__FILM__CARD;
