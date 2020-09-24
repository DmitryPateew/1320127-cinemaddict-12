import {getRandomInteger} from "./utils/common";

export const COUNT_MOST_COMMENTED_FILM = 2;
export const FILM_PER_STEP = 5;

export const LENGTH__LINE = 50;
export const START__DATE = new Date(2001, 0, 1);
export const END__DATE = new Date();
export const COUNT__COMMENT = getRandomInteger(1, 10);
export const EMOJI__SIZE = 60;

export const MINUTES__IN__HOURS = 60;
export const AUTHORIZATION = `Basic hS2sd3dfSwcl1sa2j`;
export const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

export const SortType = {
  DEFAULT: `default`,
  DATE_UP: `date-up`,
  RATING_UP: `rating-up`
};

export const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
  ADD_FILM: `ADD_FILM`,
  DELETE_FILM: `DELETE_FILM`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const FilterType = {
  ALL: `All`,
  WATCHLIST: `WatchList`,
  HISTORY: `History`,
  FAVORITES: `Favorites`
};

export const TimeFormat = {
  COMMENT: `Y/MMMM/DD HH:mm`,
  FILM: `HH[h] mm[m]`,
  REALISE: `DD MMMM YYYY`
};
