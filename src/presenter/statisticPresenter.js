import {StatisticPeriods} from "../consant";
import {render} from "../utils/render";
import StatisticPageView from "../view/statisticView";
import {statisticsPeriod} from "../utils/statistic";
import {remove} from "../view/abstractView";

export default class StatisticsPresenter {
  constructor(boardContainer, filmModel) {
    this._boardContainer = boardContainer;
    this._filmModel = filmModel;


    this._currentFilter = StatisticPeriods.ALL;
    this._statisticsPageComponent = null;

    this._filterClickHandler = this._filterClickHandler.bind(this);
  }

  init(films = this._filmModel.getFilms()) {
    const prevStatisticsPageComponent = this._statisticsPageComponent;

    const watchedFilms = films.filter((film) => film.history);


    this._statisticsPageComponent = new StatisticPageView(this._currentFilter, watchedFilms);

    this._statisticsPageComponent.setFilterClickHandler(this._filterClickHandler);

    if (prevStatisticsPageComponent === null) {
      render(this._boardContainer, this._statisticsPageComponent);
      return;
    }

    remove(prevStatisticsPageComponent);
  }

  destroy() {
    remove(this._statisticsPageComponent);
    this._statisticsPageComponent = null;
  }

  _filterClickHandler(filterType) {
    this._currentFilter = filterType;
    const films = statisticsPeriod[filterType](this._filmModel.getFilms());
    this.destroy();
    this.init(films);
  }
}
