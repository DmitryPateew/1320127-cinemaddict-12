import {render} from "../utils/render";
import FilmListContainerView from "../view/filmListContainerView";
import NoFilmView from "../view/noFilmView";
import {FILM_PER_STEP, SortType, UpdateType, UserAction} from "../consant";
import ShowButtonView from "../view/showButtonView";
import {COUNT_MOST_COMMENTED_FILM} from "../consant";
import TopListSectionView from "../view/topListSectionView";
import CommentedListSectionView from "../view/commentedListSectionView";
import FilmListSectionView from "../view/filmListSectionView";
import SortView from "../view/sortView";
import {sortFilmUp, sortFilmUpRating} from "../utils/film";
import FilmPresenter from "./filmPresenter";
import {remove} from "../view/abstractView";
import {filter} from "../utils/filtr";
import LoadingView from "../view/loadingView";

export default class BoardPresenter {
  constructor(boardContainer, filmsModel, filterModel, api) {
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._api = api;
    this._loadingComponent = new LoadingView();
    this._boardContainer = boardContainer;
    this._currentSortType = SortType.DEFAULT;
    this._filmListContainerComponent = new FilmListContainerView();
    this._noFilmComponent = new NoFilmView();
    this._showButtonComponent = null;
    this._filmListSectionComponent = new FilmListSectionView();
    this._topListSectionComponent = new TopListSectionView();
    this._containerForTopComponent = new FilmListContainerView();
    this._comentedListSectionComponent = new CommentedListSectionView();
    this._containerForComentedComponent = new FilmListContainerView();
    this._sortComponent = new SortView();
    this._isLoadingComponent = true;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._filmPresenter = {};
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderSort();
    render(this._boardContainer, this._filmListSectionComponent);
    render(this._filmListSectionComponent, this._filmListContainerComponent);
    this._renderBoard();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[filterType](films);
    switch (this._currentSortType) {
      case SortType.DATE_UP:
        return filteredFilms.sort(sortFilmUp);
      case SortType.RATING_UP:
        return filteredFilms.sort(sortFilmUpRating);
    }
    return filteredFilms;
  }


  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update).then((response) => {
          this._filmsModel.updateFilm(updateType, response);
        });
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
      case UpdateType.INIT:
        this._isLoadingComponent = false;
        remove(this._loadingComponent);
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
    render(this._boardContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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
    remove(this._showButtonComponent);
    remove(this._loadingComponent);

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
    films.forEach((film) => this._renderFilm(film, this._filmListContainerComponent));
  }

  _renderFilm(film, position) {
    const filmPresenter = new FilmPresenter(position, this._handleViewAction, this._handleViewAction);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderNoFilm() {
    render(this._filmListContainerComponent, this._noFilmComponent);
  }

  _renderShowButton() {
    let renderedFilmCount = FILM_PER_STEP;
    if (this._showButtonComponent !== null) {
      this._showButtonComponent = null;
    }
    this._showButtonComponent = new ShowButtonView();
    render(this._boardContainer, this._showButtonComponent);
    this._showButtonComponent.setClickHandler(() => {
      this._getFilms()
        .slice(renderedFilmCount, renderedFilmCount + FILM_PER_STEP)
        .forEach((film) => this._renderFilm(film, this._filmListContainerComponent));
      renderedFilmCount += FILM_PER_STEP;
      if (renderedFilmCount >= this._getFilms().length) {
        this._showButtonComponent.getElement().remove();
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
      .forEach((boardFilms) => this._renderFilmAdditional(boardFilms, this._containerForTopComponent));
  }

  _renderCommentedFilms() {
    this._getFilms()
      .slice(0, COUNT_MOST_COMMENTED_FILM)
      .forEach((boardFilms) => this._renderFilmAdditional(boardFilms, this._containerForComentedComponent));
  }


  _renderAdditionalSection() {
    render(this._boardContainer, this._topListSectionComponent);
    render(this._topListSectionComponent, this._containerForTopComponent);
    this._renderRatingFilms();
    render(this._boardContainer, this._comentedListSectionComponent);
    render(this._comentedListSectionComponent, this._containerForComentedComponent);
    this._renderCommentedFilms();
  }

  _renderLoading() {
    render(this._filmListContainerComponent, this._loadingComponent);
  }

  _renderBoard() {
    if (this._isLoadingComponent) {
      this._renderLoading();
      return;
    }
    if (this._getFilms().length === 0) {
      this._renderNoFilm();
      return;
    }

    const filmCount = this._getFilms().length;

    const movies = this._getFilms().slice(0, Math.min(filmCount, FILM_PER_STEP));
    this._renderFilms(movies);
    if (filmCount > FILM_PER_STEP) {
      this._renderShowButton();
    }
    this._renderAdditionalSection();
  }
}
