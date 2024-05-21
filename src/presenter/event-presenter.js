import { render, replace, RenderPosition } from '../framework/render.js';
import EventView from '../view/event-view.js';
import FormView from '../view/form-view.js';
import { updateItem} from '../utils.js';

export default class EventPresenter {
  #container = null;
  #event = null;
  #destinations = [];
  #offers = [];
  #eventView = null;
  #formView = null;
  #handleEventUpdate = null;

  constructor({container, destinations, offers, onEventUpdate}) {
    this.#container = container;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEventUpdate = onEventUpdate;
  }

  init(event) {
    this.#event = event;
    this.#renderEvent(this.#event, this.#destinations, this.#offers);
  }

  #renderEvent(event, destinations, offers) {
    const prevEventView = this.#eventView;

    this.#eventView = new EventView({
      event,
      destinations,
      offers,
      onEditClick: () => {
        this.#replaceEventToForm();
      },
      onFavoriteClick: () => {
        const updateEvent = updateItem(event, {isFavorite: !event.isFavorite});
        this.#handleEventUpdate(updateEvent);
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

    if (prevEventView === null) {
      render(this.#eventView, this.#container, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#eventView, prevEventView);
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
