import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (type, currentFilter) => `
  <div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilter ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
  </div>`;

const createFiltersTemplate = (filters, currentFilter) => `
  <form class="trip-filters" action="#" method="get">
    ${filters.map((type) => createFilterItemTemplate(type, currentFilter)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class FilterView extends AbstractView {
  #filters = [];
  #currentFilter = '';
  #handleFilterChange = null;

  constructor({filters, currentFilter, onFilterChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterChange = onFilterChange;

    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterChange(evt.target.value);
  };
}
