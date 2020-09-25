import FilmCardView from "../view/filmCardView";
import PopUpView from "../view/popUpView";
import {render} from "../utils/render";
import {remove} from "../view/abstractView";
import {UserAction, UpdateType} from "../consant";

export default class FilmPresenter {
  constructor(position, changeData) {
    this._position = position;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleWatchClick = this._handleWatchClick.bind(this);

    this._changeData = changeData;
    this._filmComponent = null;
    this._filmPopUpComponent = null;
  }


  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevFilmPupUp = this._filmPopUpComponent;

    this._filmComponent = new FilmCardView(film);
    this._filmPopUpComponent = new PopUpView(film);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._filmComponent.setWatchClickHandler(this._handleWatchClick);

    this._filmComponent.setClickHandler(() => {
      const exactPopUpElement = this._filmPopUpComponent.getElement();
      render(this._position, exactPopUpElement);
      this._filmPopUpComponent.setEmojiHandler();
      this._filmPopUpComponent.setClickHandler(() => {
        exactPopUpElement.remove();
      });
      this._filmPopUpComponent.setSubmitHandler(() => {
        this._filmPopUpComponent = new PopUpView(film);
      });
      this._filmPopUpComponent.setTextHandler();
    });

    if (prevFilmComponent === null || prevFilmPupUp === null) {
      render(this._position, this._filmComponent);
      return;
    }

    if (this._position.getElement().contains(prevFilmComponent.getElement())) {
      return;
    }
    if (this._position.getElement().contains(prevFilmPupUp.getElement())) {
      return;
    }
    remove(prevFilmComponent);
    remove(prevFilmPupUp);
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

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopUpComponent);
  }
}
