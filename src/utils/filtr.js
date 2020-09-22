import {FilterType} from "../consant";
export const filter = {
  [FilterType.ALL]: (films) => films.filter((film) => film),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.favorite),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.history),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.watch),
};
