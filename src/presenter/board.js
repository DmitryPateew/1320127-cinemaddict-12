import {generateListComments} from "../mock/coment";
import FilmCardView from "../view/film-card";
import PopUpView from "../view/pop-up";
import {render} from "../utils/render";
import FilmListContainerView from "../view/film-list-container";
import NoFilm from "../view/no-Film";
import {FILM_PER_STEP} from "../consant";
import {SortType} from "../consant";
import ShowButtonView from "../view/show-button";
import {COUNT__FILM__CARD} from "../consant";
import {COUNT_MOST_COMMENTED_FILM} from "../consant";
import TopListSectionView from "../view/top-list-section";
import ComentedListSectionView from "../view/comented-list-section";
import FilmListSectionView from "../view/film-list-section";
import SortView from "../view/sort";
import {sortFilmUp, sortFilmUpRating} from "../utils/film";

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._filmListContainerView = new FilmListContainerView();
    this._noFilmComponent = new NoFilm();
    this._filmListContainerView = new FilmListContainerView();
    this._showButtonView = new ShowButtonView();
    this._filmListSectionView = new FilmListSectionView();
    this._topListSectionView = new TopListSectionView();
    this._containerForTop = new FilmListContainerView();
    this._comentedListSectionView = new ComentedListSectionView();
    this._containerForComented = new FilmListContainerView();
    this._sortView = new SortView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    this._sourcedBoardFilms = boardFilms.slice();
    this._renderSort();
    render(this._boardContainer, this._filmListSectionView);
    render(this._filmListSectionView, this._filmListContainerView);
    this._renderBoard();
    this._renderAdditonalSection();
  }

  _sortFilm(sortType) {
    switch (sortType) {
      case SortType.DATE_UP:
        this._boardFilms.sort(sortFilmUp);
        break;
      case SortType.RATING_UP:
        this._boardFilms.sort(sortFilmUpRating);
        break;
      default:
        this._boardFilms = this._sourcedBoardFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilm(sortType);
    this._clearFilmList();
    this._renderFilms(0, Math.min(this._boardFilms.length, FILM_PER_STEP));
  }

  _renderSort() {
    render(this._boardContainer, this._sortView);
    this._sortView.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _clearFilmList() {
    this._filmListContainerView.getElement().innerHTML = ``;
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilms) => this._renderFilm(boardFilms, this._filmListContainerView));
  }

  _renderFilm(film, position) {
    const comments = generateListComments();
    const filmComponent = new FilmCardView(film);
    const filmPopUp = new PopUpView(film, comments);

    filmComponent.setClickHandler(() => {
      let exectPopup = filmPopUp.getElement();
      render(position, exectPopup);
      filmPopUp.setClickHandler(() => {
        exectPopup.remove();
      });
    });
    render(position, filmComponent);
  }

  _renderNoFilm() {
    render(this._filmListContainerView, this._noFilmComponent);
  }

  _renderShowButton() {
    let renderedFilmCount = FILM_PER_STEP;
    render(this._boardContainer, this._showButtonView);
    this._showButtonView.setClickHandler(() => {
      this._boardFilms
        .slice(renderedFilmCount, renderedFilmCount + FILM_PER_STEP)
        .forEach((film) => this._renderFilm(film, this._filmListContainerView));
      renderedFilmCount += FILM_PER_STEP;
      if (renderedFilmCount >= this._boardFilms.length) {
        this._showButtonView.getElement().remove();
      }
    });
  }

  _maxRatingFilm() {
    let copyFilm = this._boardFilms.slice();
    let ratingFilms = [];
    let firstMaxValue = copyFilm.reduce((prev, current) => (prev.totalRating > current.totalRating) ? prev : current);
    ratingFilms.push(firstMaxValue);
    copyFilm.splice(copyFilm.indexOf(firstMaxValue), 1);
    let secondMaxValue = copyFilm.reduce((prev, current) => (prev.totalRating > current.totalRating) ? prev : current);
    ratingFilms.push(secondMaxValue);
    return ratingFilms;
  }

  _renderRatingFilms() {
    this._maxRatingFilm()
      .slice(0, this._maxRatingFilm().length)
      .forEach((boardFilms) => this._renderFilm(boardFilms, this._containerForTop));
  }

  _renderCommentedFilms() {
    this._boardFilms
      .slice(0, COUNT_MOST_COMMENTED_FILM)
      .forEach((boardFilms) => this._renderFilm(boardFilms, this._containerForComented));
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
    if (COUNT__FILM__CARD === 0) {
      this._renderNoFilm();
      return;
    }
    this._renderFilms(0, Math.min(this._boardFilms.length, FILM_PER_STEP));
    if (this._boardFilms.length > FILM_PER_STEP) {
      this._renderShowButton();
    }
  }

}
