import { Filters } from '../const.js';

export default class FilterModel {
  #filter = Filters.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(filter) {
    this.#filter = filter;
  }
}
