import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import FormView from '../view/form-view.js';

export default class MainPresenter {
  #container = null;
  #eventModel = null;

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

    // Рендеринг сортировки
    render(this.#sortComponent, this.#container);

    // Рендеринг списка путешествий
    render(this.#eventsListComponent, this.#sortComponent.element, RenderPosition.AFTEREND);

    // Рендеринг формы создания/редактирования точки путешествия
    // Рендеринг точек путешествия
    this.#events.forEach((event, index) => {
      const view = index === 0
        ? new FormView({event, destinations: this.#eventModel.destinations, offers: this.#eventModel.offers})
        : new EventView({event, destinations: this.#eventModel.destinations, offers: this.#eventModel.offers});
      render(view, this.#eventsListComponent.element, RenderPosition.BEFOREEND);
    });
  }
}
