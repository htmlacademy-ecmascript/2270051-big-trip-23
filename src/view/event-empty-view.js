import AbstractView from '../framework/view/abstract-view.js';
import { EventEmptyMessages } from '../const.js';

const createEventEmptyTemplate = (filter) => `<p class="trip-events__msg">${EventEmptyMessages[filter]}</p>`;

export default class EventEmptyView extends AbstractView {
  #filter = '';

  constructor({filter}) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createEventEmptyTemplate(this.#filter);
  }
}
