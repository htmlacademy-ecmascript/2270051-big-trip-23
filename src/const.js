export const EVENT_COUNT = 3;
export const PHOTO_URL = 'https://loremflickr.com/248/152?random=';

export const BLANK_EVENT = {
  type: 'flight',
  destination: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  basePrice: 0,
  offers: []
};

export const Filters = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export const EventEmptyMessages = {
  [Filters.EVERYTHING]: 'Click New Event to create your first point',
  [Filters.FUTURE]: 'There are no future events now',
  [Filters.PRESENT]: 'There are no present events now',
  [Filters.PAST]: 'There are no past events now'
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};
