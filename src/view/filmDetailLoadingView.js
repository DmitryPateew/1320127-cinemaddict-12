import AbstractView from "./abstractView";

export default class FilmDetailLoadingView extends AbstractView {
  _getTemplate() {
    return (
      `<div class="films-list__details-loading">
        <div class="films-list__details-loading-block"><div></div><div></div></div>
      </div>`
    );
  }
}
