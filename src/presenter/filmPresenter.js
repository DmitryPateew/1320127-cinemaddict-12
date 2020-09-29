import FilmCardView from "../view/filmCardView";
import PopUpView from "../view/popUpView";
import {render, replace} from "../utils/render";
import {remove} from "../view/abstractView";
import {UserAction, UpdateType, Mode} from "../consant";
import CommentListPresenter from "./commentListPresenter";
import CommentModel from "../model/commentModel";
import FilmDetailLoadingView from "../view/filmDetailLoadingView";

export default class FilmPresenter {
  constructor(position, changeData, changeMode, api) {
    this._position = position;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._api = api;
    this._loadingComponent = new FilmDetailLoadingView();
    this._commentListPresenter = null;
    this._commentsModel = new CommentModel();
    this._filmComponent = null;
    this._filmPopUpComponent = null;
    this._mode = Mode.CLOSED;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleWatchClick = this._handleWatchClick.bind(this);

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._closeFilmDetailHandler = this._closeFilmDetailHandler.bind(this);
    this._openFilmDetailHandler = this._openFilmDetailHandler.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._commentsModel.addObserver(this._handleModelEvent);
  }


  init(film) {
    this._film = film;
    this.renderFilmComponent(film);
    if (this._mode === Mode.OPENED) {
      this._replaceOpenedPopupInfo();
    }
  }

  renderFilmComponent(film) {
    this._film = film;
    this._film.coments = this._commentsModel.getComments();

    const prevFilmCardComponent = this._filmComponent;

    this._filmComponent = new FilmCardView(film);

    this._filmComponent.setOpenPopupFilmDetailHandler(this._openFilmDetailHandler);

    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._filmComponent.setWatchClickHandler(this._handleWatchClick);

    if (prevFilmCardComponent === null) {
      render(this._position, this._filmComponent);
      return;
    }

    if (this._position.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  }

  _openFilmDetailHandler() {
    render(this._position, this._loadingComponent);

    this._api.getComments(this._film).then((response) => {
      remove(this._loadingComponent);

      this._commentsModel.setComments(response);
      this._film.loadedComments = this._commentsModel.getComments();

      this._prepareFilmDetailComponent();

      render(this._position, this._filmPopUpComponent);

      this._renderComments();

      document.addEventListener(`keydown`, this._escKeyDownHandler);
      this._changeMode();
      this._mode = Mode.OPENED;
    });
  }

  _closeFilmDetailHandler() {
    remove(this._filmPopUpComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.CLOSED;
  }

  _replaceOpenedPopupInfo() {
    const prevFilmDetailComponent = this._filmPopUpComponent;
    this._prepareFilmDetailComponent();

    replace(this._filmPopUpComponent, prevFilmDetailComponent);

    remove(prevFilmDetailComponent);

    this._renderComments();
  }

  _handleFavoriteClick() {
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, Object.assign({}, this._film, {favorite: !this._film.favorite}));
  }

  _handleHistoryClick() {
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, Object.assign({}, this._film, {history: !this._film.history}));
  }

  _handleWatchClick() {
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, Object.assign({}, this._film, {watch: !this._film.watch}));
  }

  _prepareFilmDetailComponent() {
    this._filmPopUpComponent = new PopUpView(this._film);

    this._filmPopUpComponent.setFavoriteClickHandler(this._handleFavoriteClick());
    this._filmPopUpComponent.setAlreadyWatchClickHandler(this._handleHistoryClick);
    this._filmPopUpComponent.setInWatchlistClickHandler(this._handleWatchClick);
    this._filmPopUpComponent.setClosePopupFilmDetailHandler(this._closeFilmDetailHandler);
    this._filmPopUpComponent.restoreHandlers();
  }

  _handleModelEvent(actionType) {
    switch (actionType) {
      case UserAction.DELETE_COMMENT:
      case UserAction.SET_COMMENTS:
        const comments = this._commentsModel.getComments();
        this._renderComments();
        this._changeData(
            actionType,
            UpdateType.PATCH,
            Object.assign({}, this._film, {
              comments: comments.map((comment) => comment.id),
              commentsLength: comments.length,
              loadedComments: this._commentsModel.getComments()
            }
            )
        );
        break;
    }
  }

  resetView() {
    if (this._mode !== Mode.CLOSED) {
      this._closeFilmDetailHandler();
    }
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopUpComponent);
    this._commentsModel.removeObserver(this._handleModelEvent);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closeFilmDetailHandler();
    }
  }

  _renderComments() {
    const container = this._filmPopUpComponent.getElement().querySelector(`.form-details__bottom-container`);
    if (this._commentListPresenter !== null) {
      this._commentListPresenter.destroy();
    }
    this._commentListPresenter = new CommentListPresenter(container, this._commentsModel, this._film, this._api);
    this._commentListPresenter.init();
  }

}
