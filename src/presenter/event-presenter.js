import { render, replace, RenderPosition } from '../framework/render.js';
import EventView from '../view/event-view.js';
import FormView from '../view/form-view.js';
import { updateItem } from '../utils/utils.js';
import { Mode } from '../const.js';

export default class EventPresenter {
  #container = null;
  #event = null;
  #destinations = [];
  #offers = [];
  #eventView = null;
  #formView = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({ container, destinations, offers, onDataChange, onModeChange }) {
    this.#container = container;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;
    this.#renderEvent(this.#event, this.#destinations, this.#offers);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToEvent();
    }
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
        this.#handleDataChange(updateEvent);
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
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToEvent () {
    this.#formView.resetForm(this.#event);
    replace(this.#eventView, this.#formView);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      this.#formView.resetForm(this.#event);
      this.#replaceFormToEvent();
    }
  };
}
