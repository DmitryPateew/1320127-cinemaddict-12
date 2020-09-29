import {render} from "../utils/render";
import AbstractView, {remove} from "../view/abstractView";
import {UpdateType, UserAction} from "../consant";
import CommentView from "../view/comentView";

export default class CommentPresenter extends AbstractView {
  constructor(commentContainer, changeData, api) {
    super();
    this._data = {};
    this._commentContainer = commentContainer;
    this._api = api;
    this._changeData = changeData;
    this._commentComponent = null;

    this._commentDeleteClickHandler = this._commentDeleteClickHandler.bind(this);
  }

  init(comment) {
    this._comment = comment;

    const prevCommentComponent = this._commentComponent;

    this._commentComponent = new CommentView(comment);

    this._commentComponent.setCommentDeleteHandler(this._commentDeleteClickHandler);

    if (prevCommentComponent === null) {
      render(this._commentContainer, this._commentComponent);
      return;
    }

    remove(prevCommentComponent);
  }

  destroy() {
    remove(this._commentComponent);
  }

  _setDeleting() {
    this._commentComponent.updateData({
      isDisabled: true,
      isDeleting: true
    });
  }


  updateElement() {
    let prevElement = this._commentComponent.getElement();
    const parent = prevElement.parentElement;
    this._commentComponent.removeElement();

    const newElement = this._commentComponent.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null;

    this._commentComponent.restoreHandlers();
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign({}, this._data, update);

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }


  _setAborting() {
    const resetFormState = () => {
      this._commentComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._commentComponent.shake(resetFormState);
  }

  _commentDeleteClickHandler(commentId) {
    this._setDeleting();
    this._api.deleteComment(commentId)
      .then(() => {
        this._changeData(
            UserAction.DELETE_COMMENT,
            UpdateType.PATCH,
            Object.assign({}, this._comment)
        );
      })
      .catch(() => {
        this._setAborting();
      });
  }
}
