import { createElement } from '../render.js';

const createEventsListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class EventsListView {
  getTemplate() {
    return createEventsListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  // Добавляем элемент li в список ul
  addItem(itemView) {
    this.getElement().append(itemView.getElement());
  }

  removeElement() {
    this.element = null;
  }
}
