import {render} from "../utils/render";
import FilmListContainerView from "../view/film-list-container";
import NoFilm from "../view/no-Film";
import {FILM_PER_STEP, SortType, UpdateType, UserAction} from "../consant";
import ShowButtonView from "../view/show-button";
import {COUNT_MOST_COMMENTED_FILM} from "../consant";
import TopListSectionView from "../view/top-list-section";
import ComentedListSectionView from "../view/comented-list-section";
import FilmListSectionView from "../view/film-list-section";
import SortView from "../view/sort";
import {sortFilmUp, sortFilmUpRating} from "../utils/film";
import FilmPresenter from "./film";
import {remove} from "../view/abstract";
import {filter} from "../utils/filtr";

export default class Board {
  constructor(boardContainer, filmsModel, filterModel) {
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._boardContainer = boardContainer;
    this._currentSortType = SortType.DEFAULT;
    this._filmListContainerView = new FilmListContainerView();
    this._noFilmComponent = new NoFilm();
    this._filmListContainerView = new FilmListContainerView();
    this._showButtonView = null;
    this._filmListSectionView = new FilmListSectionView();
    this._topListSectionView = new TopListSectionView();
    this._containerForTop = new FilmListContainerView();
    this._comentedListSectionView = new ComentedListSectionView();
    this._containerForComented = new FilmListContainerView();
    this._sortView = new SortView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._filmPresenter = {};
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderSort();
    render(this._boardContainer, this._filmListSectionView);
    render(this._filmListSectionView, this._filmListContainerView);
    this._renderBoard();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE_UP:
        return filtredFilms.sort(sortFilmUp);
      case SortType.RATING_UP:
        return filtredFilms.sort(sortFilmUpRating);
    }
    return filtredFilms;
  }


  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_FILM:
        this._filmsModel.addFilm(updateType, update);
        break;
      case UserAction.DELETE_FILM:
        this._filmsModel.deleteFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard({resetRenderedFilmCount: true});
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmCount: true});
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmList();
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILM_PER_STEP));
    this._renderFilms(films);
  }

  _renderSort() {
    render(this._boardContainer, this._sortView);
    this._sortView.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
  }

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    this._clearFilmList();
    remove(this._noFilmComponent);
    remove(this._showButtonView);

    if (resetRenderedFilmCount) {
      this._renderedTaskCount = FILM_PER_STEP;
    } else {
      this._renderedTaskCount = Math.min(filmCount, this._renderedTaskCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film, this._filmListContainerView));
  }

  _renderFilm(film, position) {
    const filmPresenter = new FilmPresenter(position, this._handleViewAction, this._handleViewAction);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderNoFilm() {
    render(this._filmListContainerView, this._noFilmComponent);
  }

  _renderShowButton() {
    let renderedFilmCount = FILM_PER_STEP;
    if (this._showButtonView !== null) {
      this._showButtonView = null;
    }
    this._showButtonView = new ShowButtonView();
    render(this._boardContainer, this._showButtonView);
    this._showButtonView.setClickHandler(() => {
      this._getFilms()
        .slice(renderedFilmCount, renderedFilmCount + FILM_PER_STEP)
        .forEach((film) => this._renderFilm(film, this._filmListContainerView));
      renderedFilmCount += FILM_PER_STEP;
      if (renderedFilmCount >= this._getFilms().length) {
        this._showButtonView.getElement().remove();
      }
    });
  }

  _maxRatingFilm() {
    let copyFilm = this._getFilms().slice();
    let ratingFilms = [];
    let firstMaxValue = copyFilm.reduce((prev, current) => (prev.totalRating > current.totalRating) ? prev : current);
    ratingFilms.push(firstMaxValue);
    copyFilm.splice(copyFilm.indexOf(firstMaxValue), 1);
    let secondMaxValue = copyFilm.reduce((prev, current) => (prev.totalRating > current.totalRating) ? prev : current);
    ratingFilms.push(secondMaxValue);
    return ratingFilms;
  }


  _renderFilmAdditional(film, position) {
    const filmPresenter = new FilmPresenter(position);
    filmPresenter.init(film);
  }

  _renderRatingFilms() {
    this._maxRatingFilm()
      .slice(0, this._maxRatingFilm().length)
      .forEach((boardFilms) => this._renderFilmAdditional(boardFilms, this._containerForTop));
  }

  _renderCommentedFilms() {
    this._getFilms()
      .slice(0, COUNT_MOST_COMMENTED_FILM)
      .forEach((boardFilms) => this._renderFilmAdditional(boardFilms, this._containerForComented));
  }

  _renderAdditonalSection() {
    render(this._boardContainer, this._topListSectionView);
    render(this._topListSectionView, this._containerForTop);
    this._renderRatingFilms();
    render(this._boardContainer, this._comentedListSectionView);
    render(this._comentedListSectionView, this._containerForComented);
    this._renderCommentedFilms();
  }

  _renderBoard() {
    if (this._getFilms().length === 0) {
      this._renderNoFilm();
      return;
    }
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILM_PER_STEP));

    this._renderFilms(films);
    if (filmCount > FILM_PER_STEP) {
      this._renderShowButton();
    }
    this._renderAdditonalSection();
  }
}
