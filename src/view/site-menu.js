import Abstract from "./abstract";

const createMenuItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  return (`
      <a href="${name}"  class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``} ">${name}
      ${name === `All` ? `` : `<span class="main-navigation__item-count">${count}</span>`}
    </a>
  `);
};

const createMenuTemplate = (menuItems, currentFilterType) => {
  const menuItemsTemplate = menuItems
    .map((filter) => createMenuItemTemplate(filter, currentFilterType))
    .join(``);


  return (
    `<nav class="main-navigation">
<div class="main-navigation__items">  ${menuItemsTemplate}  </div>
<a href="#stats" class="main-navigation__additional">Stats</a>
</nav>
`
  );
};

export default class SiteMenu extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  _getTemplate() {
    return createMenuTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    const type = evt.target.href.split(`/`);
    this._callback.filterTypeChange(type[3]);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
