import { getRandomArrayElement } from '../utils/utils.js';
import { mockDestinations } from './mock-destinations.js';
import { mockOffers } from './mock-offers.js';

const mockEvents = [
  {
    id: '11',
    basePrice: 1100,
    dateFrom: '2019-07-10T09:15:56.845Z',
    dateTo: '2019-07-11T04:55:13.375Z',
    destination: mockDestinations[0].id,
    isFavorite: false,
    offers: [
      mockOffers[0].offers[0].id
    ],
    type: mockOffers[0].type
  },
  {
    id: '22',
    basePrice: 900,
    dateFrom: '2019-08-02T06:15:56.845Z',
    dateTo: '2019-08-02T06:55:13.375Z',
    destination: mockDestinations[1].id,
    isFavorite: true,
    offers: [
      mockOffers[1].offers[0].id,
      mockOffers[1].offers[1].id
    ],
    type: mockOffers[1].type
  },
  {
    id: '33',
    basePrice: 875,
    dateFrom: '2019-09-15T08:15:56.845Z',
    dateTo: '2019-09-17T04:55:13.375Z',
    destination: mockDestinations[2].id,
    isFavorite: true,
    offers: [
      mockOffers[2].offers[2].id
    ],
    type: mockOffers[2].type
  },
  {
    id: '44',
    basePrice: 300,
    dateFrom: '2019-10-25T09:00:56.845Z',
    dateTo: '2019-10-25T09:25:13.375Z',
    destination: mockDestinations[0].id,
    isFavorite: false,
    offers: [],
    type: mockOffers[0].type
  }
];

const getRandomEvent = () => getRandomArrayElement(mockEvents);

export { getRandomEvent };
