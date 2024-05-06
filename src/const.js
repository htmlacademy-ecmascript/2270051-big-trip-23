const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'];
const FILTER_TYPES = ['everything', 'future', 'present', 'past'];
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

export { SORT_TYPES, FILTER_TYPES, EVENT_COUNT, PHOTO_URL, BLANK_EVENT };
