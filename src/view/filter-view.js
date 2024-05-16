import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filterName, currentFilter, isDisabled) => `
  <div class="trip-filters__filter">
    <input id="filter-${filterName}"
    class="trip-filters__filter-input  visually-hidden"
    type="radio"
    name="trip-filter"
    value="${filterName}"
    ${filterName === currentFilter ? 'checked' : ''}
    ${isDisabled ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filterName}">${filterName}</label>
  </div>`;

const createFiltersTemplate = (filters, currentFilter, isDisabled) => `
  <form class="trip-filters" action="#" method="get">
    ${Object.values(filters).map((filterName) => createFilterItemTemplate(filterName, currentFilter, isDisabled)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class FilterView extends AbstractView {
  #filters = {};
  #currentFilter = '';
  #handleFilterChange = null;
  #isDisabled = false;

  constructor({filters, currentFilter, onFilterChange, isDisabled}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterChange = onFilterChange;
    this.#isDisabled = isDisabled;

    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter, this.#isDisabled);
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterChange(evt.target.value);
  };
}
