import { render, replace, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import FormView from '../view/form-view.js';
import EventEmptyView from '../view/event-empty-view.js';

// Функция для проверки, пуст ли массив
const isEmpty = (array) => !(array && array.length > 0);

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
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new EventView({
      event,
      destinations: this.#eventModel.destinations,
      offers: this.#eventModel.offers,
      onEditClick: () => {
        replaceEventToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const formComponent = new FormView({
      event,
      destinations: this.#eventModel.destinations,
      offers: this.#eventModel.offers,
      onFormSubmit: () => {
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onEditClick: () => {
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceEventToForm() {
      replace(formComponent, eventComponent);
    }

    function replaceFormToEvent () {
      replace(eventComponent, formComponent);
    }

    render(eventComponent, this.#eventsListComponent.element, RenderPosition.BEFOREEND);
  }
}
