const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'];
const FILTER_TYPES = ['everything', 'future', 'present', 'past'];
const EVENT_COUNT = 4;
const PHOTO_URL = 'https://loremflickr.com/248/152?random=';

const DATE_FORMATS = {
  'MMM DD': 'MMM DD',
  'HH:mm': 'HH:mm',
  'YYYY-MM-DD': 'YYYY-MM-DD',
  'YYYY-MM-DDTHH:mm': 'YYYY-MM-DDTHH:mm',
  'DD/MM/YY HH:mm': 'DD/MM/YY HH:mm'
};

// Форма по умолчанию
const BLANK_EVENT = {
  type: 'flight',
  destination: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  basePrice: 0,
  offers: []
};

export { SORT_TYPES, FILTER_TYPES, EVENT_COUNT, PHOTO_URL, DATE_FORMATS, BLANK_EVENT };
