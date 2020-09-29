import FilmsModel from "./model/filmsModel";
import CommentModel from "./model/commentModel";

const Method = {
  GET: `GET`,
  PUT: `PUT`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  deleteComment(commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE
    });
  }

  getFilms() {
    return this._load({url: `movies`})
      .then(Api.toJSON)
      .then((movies) => movies.map(FilmsModel.adaptToClient));
  }

  updateFilm(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptToServer(film)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClient);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._endPoint}/${url}`, {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  addComment(comment) {
    const filmId = comment.filmId;
    return this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(CommentModel.adaptToServer(comment)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then((response) => response.comments.map(CommentModel.adaptToClient));
  }


  getComments(film) {
    return this._load({url: `comments/${film.id}`})
      .then(Api.toJSON)
      .then((comments) => comments.map(CommentModel.adaptToClient));
  }
  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
