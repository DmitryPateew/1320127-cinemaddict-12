import {render} from "../utils/render";
import {remove} from "../view/abstractView";
import {UserAction} from "../consant";
import {generateId} from "../utils/film";
import CommentPresenter from "./commentPresenter";
import CommentAddFormView from "../view/commentAddFormView";
import CommentListView from "../view/commentListView";

export default class CommentListPresenter {
  constructor(commentContainer, commentModel, film, api) {
    this._commentContainer = commentContainer;
    this._commentModel = commentModel;
    this._commentsLength = commentModel.getComments().length;
    this._api = api;
    this._film = film;
    this._commentPresenter = {};
    this._commentsListComponent = new CommentListView(this._commentsLength);
    this._commentsAddFormComponent = new CommentAddFormView();
    this._commentsList = this._commentsListComponent.getElement().querySelector(`.film-details__comments-list`);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._commentCtrlEnterAddHandler = this._commentCtrlEnterAddHandler.bind(this);
  }

  init() {
    render(this._commentContainer, this._commentsListComponent);
    render(this._commentsListComponent, this._commentsAddFormComponent);
    this._commentsAddFormComponent.setCommentAddHandler(this._commentCtrlEnterAddHandler);
    this._renderComments(this._commentModel.getComments());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.DELETE_COMMENT:
        this._commentModel.deleteComment(actionType, update.id);
        break;
    }
  }

  _renderComments(comments) {
    comments
      .forEach((comment) => this._renderComment(comment));
  }

  _renderComment(comment) {
    const commentPresenter = new CommentPresenter(this._commentsList, this._handleViewAction, this._api);
    commentPresenter.init(comment);
    this._commentPresenter[comment.id] = commentPresenter;
  }

  _generateBlankComment() {
    return {
      id: generateId(),
      filmId: this._film.id,
      text: ``,
      emotion: ``,
      author: ``,
      date: new Date(),
    };
  }

  _setSaving(comment) {
    this._commentsAddFormComponent.updateData({
      isSaving: true,
      comment
    });
  }

  _setAborting() {
    const resetFormState = () => {
      this._commentsAddFormComponent.updateData({
        isSaving: false,
      });
    };

    this._commentsAddFormComponent.shake(resetFormState);
  }

  _commentCtrlEnterAddHandler(update) {
    const blankComment = this._generateBlankComment();
    const comment = Object.assign(
        {},
        blankComment,
        update
    );
    this._setSaving(comment);

    this._api.addComment(comment)
      .then((response) => {
        this._commentModel.setComments(response, UserAction.SET_COMMENTS);
      })
      .catch(() => {
        this._setAborting();
      });
  }

  destroy() {
    remove(this._commentsAddFormComponent);
    remove(this._commentsListComponent);
    Object
      .values(this._commentPresenter)
      .forEach((presenter) => presenter.destroy());
    this._commentPresenter = {};
  }
}
