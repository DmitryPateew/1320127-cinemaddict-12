import AbstractView from "./abstractView";

const createLoading = () => {
  return (`<h2 class="films-list__title">Loading...</h2>`);
};

export default class LoadingView extends AbstractView {
  _getTemplate() {
    return (createLoading());
  }
}
