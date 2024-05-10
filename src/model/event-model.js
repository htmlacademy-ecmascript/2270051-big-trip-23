import { getRandomEvent } from '../mock/mock-events.js';
import { mockOffers } from '../mock/mock-offers.js';
import { mockDestinations } from '../mock/mock-destinations.js';
import { EVENT_COUNT, Filters } from '../const.js';

export default class EventModel {
  #events = Array.from({length: EVENT_COUNT}, getRandomEvent);
  #offers = mockOffers;
  #destinations = mockDestinations;
  #filter = Filters.EVERYTHING; // Установка фильтра по умолчанию

  get events() {
    return this.#events;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get filter() {
    return this.#filter;
  }

  setFilter(filter) {
    this.#filter = filter;
  }

  getFilteredEvents() {
    const now = new Date();
    switch (this.#filter) {
      case Filters.EVERYTHING:
        return this.#events;
      case Filters.FUTURE:
        return this.#events.filter((event) => new Date(event.dateFrom) > now);
      case Filters.PRESENT:
        return this.#events.filter((event) => new Date(event.dateFrom) <= now && new Date(event.dateTo) >= now);
      case Filters.PAST:
        return this.#events.filter((event) => new Date(event.dateTo) < now);
      default:
        return this.#events;
    }
  }

  updateEvents() {
    // Обновление данных в зависимости от фильтра
    this.#events = this.getFilteredEvents();
  }
}
