import {UpdateType, AUTHORIZATION, END_POINT} from "./consant.js";
import {render} from "./utils/render";
import UserTitleView from "./view/userTitleView.js";
import FilmSectionView from "./view/filmSectionView";
import BoardPresenter from "./presenter/boardPresenter";
import FilmsModel from "./model/filmsModel";
import FilterModel from "./model/filterModel";
import FilterPresenter from "./presenter/filterPresenter";
import Api from "./api";
import CommentView from "./view/comentView";
import {generateComment} from "./mock/coment";


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const filmCountPositionElement = document.querySelector(`.footer__statistics`);

const api = new Api(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const filmSectionView = new FilmSectionView();
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);
const boardPresenter = new BoardPresenter(filmSectionView, filmsModel, filterModel, api);

render(headerElement, new UserTitleView());
boardPresenter.init();
filterPresenter.init();

render(mainElement, filmSectionView);

filmCountPositionElement.textContent = api.getFilms().length;

const comment = new CommentView(generateComment());
render(filmCountPositionElement, comment.getElement());

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
