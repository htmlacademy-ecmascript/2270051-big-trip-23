import { getRandomArrayElement, getRandomPhotos } from '../utils.js';

// Пункт назначения
const mockDestination = [
  {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    cityName: 'New York',
    photos: [
      getRandomPhotos()
    ]
  },
  {
    description: 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    cityName: 'London',
    photos: [
      getRandomPhotos()
    ]
  },
  {
    description: ' Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    cityName: 'Moscow',
    photos: [
      getRandomPhotos()
    ]
  }
];

// Дополнительные опции
const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'Upgrade',
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'Nunc',
        title: 'Nunc fermentum tortor',
        price: 100
      },
      {
        id: 'Phasellus',
        title: 'Phasellus eros mauris',
        price: 50
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 'In',
        title: 'In rutrum ac purus sit amet tempus',
        price: 80
      },
      {
        id: 'Sed',
        title: 'Sed blandit, eros',
        price: 15
      },
      {
        id: 'Nullam',
        title: 'Nullam nunc ex',
        price: 25
      }
    ]
  }
];

const mockEvents = [
  {
    type: mockOffers[0].type,
    destination: mockDestination[0].description,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    basePrice: 1100,
    offers: [
      mockOffers[0].offers,
    ],
    isFavorite: false,
  },
  {
    type: mockOffers[1].type,
    destination: mockDestination[1].description,
    dateFrom: '2019-08-10T22:55:56.845Z',
    dateTo: '2019-08-11T11:22:13.375Z',
    basePrice: 870,
    offers: [
      mockOffers[1].offers,
    ],
    isFavorite: true,
  },
  {
    type: mockOffers[2].type,
    destination: mockDestination[2].description,
    dateFrom: '2019-09-10T22:55:56.845Z',
    dateTo: '2019-09-11T11:22:13.375Z',
    basePrice: 1250,
    offers: [
      mockOffers[2].offers,
    ],
    isFavorite: false,
  }
];

const getRandomEvent = () => getRandomArrayElement(mockEvents);

export { getRandomEvent };
