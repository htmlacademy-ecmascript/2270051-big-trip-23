import { render, replace, RenderPosition } from '../framework/render.js';
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

  #renderForm(event) {
    const formComponent = new FormView({event, destinations: this.#eventModel.destinations, offers: this.#eventModel.offers});
    render(formComponent, this.#eventsListComponent.element, RenderPosition.BEFOREEND);
  }
}
