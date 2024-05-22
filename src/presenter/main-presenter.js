import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventEmptyView from '../view/event-empty-view.js';
import EventPresenter from './event-presenter.js';
import { updateData } from '../utils.js';

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

  init() {
    this.#events = [...this.#eventModel.events];
    this.#renderContent();
  }

  #handleDataChange = (updateItem) => {
    this.#events = updateData(this.#events, updateItem);
    this.#eventPresenter.get(updateItem.id).init(updateItem);
  };

  #handleNodeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderContent() {
    const events = this.#eventModel.events;

    if (isEmpty(events)) {
      render(new EventEmptyView({filter: this.#eventModel.filter}), this.#container);
      return;
    }

    render(this.#sortComponent, this.#container);
    render(this.#eventsListComponent, this.#sortComponent.element, RenderPosition.AFTEREND);

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
      onDataChange: this.#handleDataChange,
      onModeChange: this.#handleNodeChange
    });

    eventPresenter.init(event);
    this.#eventPresenter.set(event.id, eventPresenter);
  }
}
