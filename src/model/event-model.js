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

  hasEvents() {
    return this.#events.length > 0;
  }
}

