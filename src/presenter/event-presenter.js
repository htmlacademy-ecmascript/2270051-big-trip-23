import { render, replace, RenderPosition } from '../framework/render.js';
import EventView from '../view/event-view.js';
import FormView from '../view/form-view.js';

export default class EventPresenter {
  #container = null;
  #event = null;
  #destinations = null;
  #offers = null;
  #eventComponent = null;
  #formComponent = null;

  constructor({container, event, destinations, offers}) {
    this.#container = container;
    this.#event = event;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init() {
    this.#renderEvent();
  }

  #renderEvent() {
    this.#eventComponent = new EventView({
      event: this.#event,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: this.#handleEditClick
    });

    render(this.#eventComponent, this.#container, RenderPosition.BEFOREEND);
  }

  #handleEditClick = () => {
    this.#formComponent = new FormView({
      event: this.#event,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onEditClick: this.#handleEditClick
    });

    replace(this.#formComponent, this.#eventComponent);
    this.#eventComponent = this.#formComponent;

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = () => {
    this.#renderEvent();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#handleEditClick();
    }
  };
}
