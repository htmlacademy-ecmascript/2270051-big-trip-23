import { render, replace, RenderPosition } from '../framework/render.js';
import EventView from '../view/event-view.js';
import FormView from '../view/form-view.js';

export default class EventPresenter {
  #container = null;
  #event = null;
  #destinations = [];
  #offers = [];
  #eventView = null;
  #formView = null;

  constructor({container, event, destinations, offers}) {
    this.#container = container;
    this.#event = event;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init() {
    this.#renderEvent(this.#event, this.#destinations, this.#offers);
  }

  #renderEvent(event, destinations, offers) {
    this.#eventView = new EventView({
      event,
      destinations,
      offers,
      onEditClick: () => {
        this.#replaceEventToForm();
      }
    });

    this.#formView = new FormView({
      event,
      destinations,
      offers,
      onFormSubmit: () => {
        this.#replaceFormToEvent();
      },
      onEditClick: () => {
        this.#replaceFormToEvent();
      }
    });

    render(this.#eventView, this.#container, RenderPosition.BEFOREEND);
  }

  #replaceEventToForm() {
    replace(this.#formView, this.#eventView);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToEvent () {
    replace(this.#eventView, this.#formView);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      this.#replaceFormToEvent();
    }
  };
}
