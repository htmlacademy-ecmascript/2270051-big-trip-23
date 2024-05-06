import { createElement } from '../render.js';
import { SORT_TYPES } from '../const.js';

const createSortItemTemplate = (type, index) => `
  <div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${index === 0 ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-${type}">${type}</label>
  </div>`;

const createSortTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORT_TYPES.map((type, index) => createSortItemTemplate(type, index)).join('')}
  </form>`;

export default class SortView {
  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
