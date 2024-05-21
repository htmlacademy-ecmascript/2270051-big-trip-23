import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventEmptyView from '../view/event-empty-view.js';
import EventPresenter from './event-presenter.js';
import { updateData } from '../utils.js';

// Функция для проверки, пуст ли массив
const isEmpty = (array) => !(array && array.length > 0);

export default class MainPresenter {
  #container = null;
  #eventModel = null;
  #eventPresenter = new Map();
  #sortComponent = new SortView();
  #eventsListComponent = new EventsListView();
  #events = [];

  constructor({container, eventModel}) {
    this.#container = container;
    this.#eventModel = eventModel;
  }

  // Точка входа для инициализации представления
  init() {
    this.#events = [...this.#eventModel.events];
    this.#renderContent();
  }

  #renderContent() {
    const events = this.#eventModel.events;

    if (isEmpty(events)) {
      render(new EventEmptyView({filter: this.#eventModel.filter}), this.#container);
      return;
    }

    render(this.#sortComponent, this.#container);

    // Рендеринг списка путешествий
    render(this.#eventsListComponent, this.#sortComponent.element, RenderPosition.AFTEREND);

    // Рендеринг точек путешествия
    this.#events.forEach((event) => {
      this.#renderEvent(event);
    });
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      container: this.#eventsListComponent.element,
      event,
      destinations: this.#eventModel.destinations,
      offers: this.#eventModel.offers,
      onEventUpdate: this.#handleDataChange
    });

    eventPresenter.init(event);
    this.#eventPresenter.set(event.id, eventPresenter);
  }

  #handleDataChange = (updateItem) => {
    this.#events = updateData(this.#events, updateItem);
    this.#eventPresenter.get(updateItem.id).init(updateItem);
  };
}
