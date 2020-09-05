import {COUNT__FILM__CARD} from "./consant.js";
import {COUNT_MOST_COMMENTED_FILM} from "./consant.js";
import {FILM_PER_STEP} from "./consant.js";

import {generateMovie} from "./mock/movie.js";
import {render} from "./utils.js";
import {generateFilter} from "./mock/filter.js";
import {generateListComments} from "./mock/coment.js";
import UserTitleView from "./view/user-title.js";
import SiteMenuView from "./view/site-menu.js";
import SortView from "./view/sort.js";
import FilmSectionView from "./view/film-section";
import FilmListSectionView from "./view/film-list-section.js";
import FilmListContainerView from "./view/film-list-container";
import FilmCardView from "./view/film-card";
import PopUpView from "./view/pop-up";
import ShowButtonView from "./view/show-button";
import TopListSectionView from "./view/top-list-section";
import ComentedListSectionView from "./view/comented-list-section";
import NoFilm from "./view/no-Film";


const films = new Array(COUNT__FILM__CARD).fill().map(generateMovie);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const filter = generateFilter();
render(headerElement, new UserTitleView().getElement());
render(mainElement, new SiteMenuView(filter).getElement());
render(mainElement, new SortView().getElement());


const filmSectionView = new FilmSectionView().getElement();
render(mainElement, filmSectionView);

const filmListSectionView = new FilmListSectionView().getElement();
render(filmSectionView, filmListSectionView);

const filmListContainerView = new FilmListContainerView().getElement();
render(filmListSectionView, filmListContainerView);

const renderFilmBoard = (countFilm) => {

  if (countFilm > 0) {
    const renderFilm = (container, film) => {
      const comments = generateListComments();
      const filmComponent = new FilmCardView(film);
      const filmPopUp = new PopUpView(film, comments);

      filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
        let exectPopup = filmPopUp.getElement();
        render(container, exectPopup);
        exectPopup.querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
          exectPopup.remove();
        });
      });

      render(container, filmComponent.getElement());
    };

    for (let i = 0; i < Math.min(films.length, FILM_PER_STEP); i++) {
      renderFilm(filmListContainerView, films[i]);
    }
    if (films.length > FILM_PER_STEP) {
      let renderedFilmCount = FILM_PER_STEP;
      const showButtonView = new ShowButtonView().getElement();
      render(filmSectionView, showButtonView);
      showButtonView.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        films
          .slice(renderedFilmCount, renderedFilmCount + FILM_PER_STEP)
          .forEach((film) => renderFilm(filmListContainerView, film));
        renderedFilmCount += FILM_PER_STEP;
        if (renderedFilmCount >= films.length) {
          showButtonView.remove();
        }
      });
    }
    const topListSectionView = new TopListSectionView().getElement();
    render(filmSectionView, topListSectionView);
    const containerForTop = new FilmListContainerView().getElement();
    render(topListSectionView, containerForTop);

    const maxRatingFilm = () => {
      let copyFilm = films.slice();
      let ratingFilms = [];
      let firstMaxValue = copyFilm.reduce((prev, current) => (prev.totalRating > current.totalRating) ? prev : current);
      ratingFilms.push(firstMaxValue);
      copyFilm.splice(copyFilm.indexOf(firstMaxValue), 1);
      let secondMaxValue = copyFilm.reduce((prev, current) => (prev.totalRating > current.totalRating) ? prev : current);
      ratingFilms.push(secondMaxValue);
      return ratingFilms;
    };

    for (let i = 0; i < maxRatingFilm().length; i++) {
      renderFilm(containerForTop, maxRatingFilm()[i]);
    }

    const comentedListSectionView = new ComentedListSectionView().getElement();
    render(filmSectionView, comentedListSectionView);

    const containerForComented = new FilmListContainerView().getElement();
    render(comentedListSectionView, containerForComented);


    for (let i = 0; i < COUNT_MOST_COMMENTED_FILM; i++) {
      renderFilm(containerForComented, films[i]);
    }
  } else {
    render(filmListContainerView, new NoFilm().getElement());
  }

};

renderFilmBoard(COUNT__FILM__CARD);
const filmCountPositionElement = document.querySelector(`.footer__statistics`);
filmCountPositionElement.textContent = COUNT__FILM__CARD;
