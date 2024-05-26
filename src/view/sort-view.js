import AbstractView from '../framework/view/abstract-view.js';
import { SortTypes } from '../const.js';

const createSortItemTemplate = (type, index, isDisabled) => `
  <div class="trip-sort__item  trip-sort__item--${type}">
      <input
      id="sort-${type}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${type}"
      ${index === 0 ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}
      data-sort-type="${type}">
    <label class="trip-sort__btn" for="sort-${type}">${type}</label>
  </div>`;

const createSortTemplate = () => {
  const sortTypesArray = Object.values(SortTypes);
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortTypesArray.map((type, index) => createSortItemTemplate(type, index, type === 'event' || type === 'offers')).join('')}
    </form>`;
};

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.classList.contains('trip-sort__input')) {
      return;
    }
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
