import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventEmptyView from '../view/event-empty-view.js';
import EventPresenter from './event-presenter.js';
import { updateData } from '../utils/utils.js';
import { sortByDay, sortByTime, sortByPrice} from '../utils/sort.js';
import { SortTypes } from '../const.js';

const isEmpty = (array) => !(array && array.length > 0);

export default class MainPresenter {
  #container = null;
  #eventModel = null;
  #eventPresenters = new Map();
  #sortComponent = null;
  #eventsListComponent = new EventsListView();
  #events = [];
  #currentSortType = SortTypes.DAY;
  #sourcedEvents = [];

  constructor({ container, eventModel }) {
    this.#container = container;
    this.#eventModel = eventModel;
  }

  init() {
    this.#events = [...this.#eventModel.events];
    this.#sourcedEvents = [...this.#eventModel.events];
    this.#renderSort();
    this.#renderContent();
  }

  #handleDataChange = (updateItem) => {
    this.#events = updateData(this.#events, updateItem);
    this.#sourcedEvents = updateData(this.#sourcedEvents, updateItem);
    this.#eventPresenters.get(updateItem.id).init(updateItem);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortEvents(sortType) {
    switch (sortType) {
      case SortTypes.DAY:
        this.#events.sort(sortByDay);
        break;
      case SortTypes.TIME:
        this.#events.sort(sortByTime);
        break;
      case SortTypes.PRICE:
        this.#events.sort(sortByPrice);
        break;
      default:
        this.#events = [...this.#sourcedEvents];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearContent();
    this.#renderContent();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#container);
  }

  #clearContent() {
    while (this.#eventsListComponent.element.firstChild) {
      this.#eventsListComponent.element.removeChild(this.#eventsListComponent.element.firstChild);
    }
  }

  #renderContent() {
    const events = this.#eventModel.events;

    if (isEmpty(events)) {
      render(new EventEmptyView({filter: this.#eventModel.filter}), this.#container);
      return;
    }

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
      onModeChange: this.#handleModeChange
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }
}
