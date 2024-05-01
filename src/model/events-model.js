import { getRandomEvent } from '../mock/event.js';
import { EVENT_COUNT } from '../const.js';

export default class EventsModel {
  events = Array.from({length: EVENT_COUNT}, getRandomEvent);

  getEvents() {
    return this.events;
  }
}
