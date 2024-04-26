const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'];
const FILTER_TYPES = ['everything', 'future', 'present', 'past'];
const POINTS_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const AMOUNT_OF_POINTS = 3;

const OFFERS = [
  {
    id: 'luggage',
    title: 'Add luggage',
    price: 30,
    checked: true
  },
  {
    id: 'comfort',
    title: 'Switch to comfort class',
    price: 100,
    checked: true
  },
  {
    id: 'meal',
    title: 'Add meal',
    price: 15,
    checked: false
  },
  {
    id: 'seats',
    title: 'Choose seats',
    price: 5,
    checked: false
  },
  {
    id: 'train-',
    title: 'Travel by train',
    price: 40,
    checked: false
  }
];

export { SORT_TYPES, FILTER_TYPES, POINTS_TYPES, AMOUNT_OF_POINTS, OFFERS };
