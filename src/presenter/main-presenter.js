// Импорт необходимых классов представлений и функции рендеринга
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import FormView from '../view/form-view.js';
import { render, RenderPosition } from '../render.js';

export default class MainPresenter {
  sortComponent = new SortView();
  eventsListComponent = new EventsListView();

  constructor({container, eventModel}) {
    this.container = container;
    this.eventModel = eventModel;
    this.destinations = this.eventModel.getDestinations();
    this.offers = this.eventModel.getOffers();
  }

  // Точка входа для инициализации представления
  init() {
    this.events = [...this.eventModel.getEvents()];

    // Рендеринг сортировки
    render(this.sortComponent, this.container);

    // Рендеринг списка путешествий
    render(this.eventsListComponent, this.sortComponent.getElement(), RenderPosition.AFTEREND);

    // Рендеринг формы создания/редактирования точки путешествия
    // Рендеринг точек путешествия
    this.events.forEach((event, index) => {
      const view = index === 0
        ? new FormView({event, destinations: this.destinations, offers: this.offers})
        : new EventView({event, destinations: this.destinations, offers: this.offers});
      render(view, this.eventsListComponent.getElement(), RenderPosition.BEFOREEND);
    });
  }
}
