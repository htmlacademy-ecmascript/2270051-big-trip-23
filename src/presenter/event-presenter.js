import { render, replace, RenderPosition } from '../framework/render.js';
import EventView from '../view/event-view.js';
import FormView from '../view/form-view.js';

export default class EventPresenter {
  #container = null;
  #event = null;
  #destinations = [];
  #offers = [];

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
    const eventView = new EventView({
      event,
      destinations,
      offers,
      onEditClick: () => {
        replaceEventToForm();
      }
    });

    const formView = new FormView({
      event,
      destinations,
      offers,
      onFormSubmit: () => {
        replaceFormToEvent();
      },
      onEditClick: () => {
        replaceFormToEvent();
      }
    });

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        replaceFormToEvent();
      }
    };

    render(eventView, this.#container, RenderPosition.BEFOREEND);

    function replaceEventToForm() {
      replace(formView, eventView);
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function replaceFormToEvent () {
      replace(eventView, formView);
      document.removeEventListener('keydown', escKeyDownHandler);
    }
  }
}
