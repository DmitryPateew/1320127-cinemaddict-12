import Observer from "../utils/observer.js";
import moment from "moment";

export default class FilmsModel extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, _films) {
    this._films = _films.slice();
    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting task`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addFilm(updateType, update) {
    this._films = [
      ...this._films,
      update
    ];

    this._notify(updateType, update);
  }

  deleteFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting task`);
    }

    this._films = [
      ...this._films.slice(0, index),
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          id: film.id,
          title: film.film_info.title,
          poster: film.film_info.poster,
          fullPoster: film.film_info.poster,
          name: film.film_info.title,
          alternativeTitle: film.film_info.alternative_title,
          director: film.film_info.director,
          writers: film.film_info.writers,
          actors: film.film_info.actors,
          date: new Date(film.film_info.release.date),
          runtime: new Date(film.film_info.runtime),
          genres: film.film_info.genre,
          countries: [film.film_info.release.release_country],
          description: film.film_info.description,
          ageRating: film.film_info.age_rating,
          watch: film.user_details.watchlist,
          history: film.user_details.already_watched,
          favorite: film.user_details.favorite,
          totalRating: film.film_info.total_rating,
          comments: film.comments
        }
    );
    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          "id": film.id,
          "comments": film.comments,
          "film_info": {
            "title": film.name,
            "alternative_title": film.alternativeTitle,
            "total_rating": film.totalRating,
            "poster": film.poster,
            "age_rating": film.ageRating,
            "director": film.director,
            "writers": film.writers,
            "actors": film.actors,
            "release": {
              "date": film.date,
              "release_country": film.countries[0]
            },
            "runtime": film.runtime,
            "genre": film.genres,
            "description": film.description
          },
          "user_details": {
            "watchlist": film.watch,
            "already_watched": film.history,
            "watching_date": moment(film.watchingDate).toISOString(),
            "favorite": film.favorite
          }
        }
    );
    return adaptedFilm;
  }
}
