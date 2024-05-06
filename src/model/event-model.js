import { getRandomEvent } from '../mock/mock-events.js';
import { mockOffers } from '../mock/mock-offers.js';
import { mockDestinations } from '../mock/mock-destinations.js';
import { EVENT_COUNT } from '../const.js';

export default class EventModel {
  events = Array.from({length: EVENT_COUNT}, getRandomEvent);
  offers = mockOffers;
  destinations = mockDestinations;

  getEvents() {
    return this.events;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
