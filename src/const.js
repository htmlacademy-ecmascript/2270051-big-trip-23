const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'];
const EVENT_COUNT = 4;
const PHOTO_URL = 'https://loremflickr.com/248/152?random=';

const BLANK_EVENT = {
  type: 'flight',
  destination: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  basePrice: 0,
  offers: []
};

const Filters = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const EventEmptyMessages = {
  [Filters.EVERYTHING]: 'Click New Event to create your first point',
  [Filters.FUTURE]: 'There are no future events now',
  [Filters.PRESENT]: 'There are no present events now',
  [Filters.PAST]: 'There are no past events now'
};

// Определение текущего фильтра
const currentFilter = Filters.EVERYTHING;

export { SORT_TYPES, EVENT_COUNT, PHOTO_URL, BLANK_EVENT, Filters, EventEmptyMessages, currentFilter };
