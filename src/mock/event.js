import { getRandomArrayElement, getRandomPhotosURL } from '../utils.js';
import { EVENTS_TYPES } from '../const.js';

// Пункт назначения
const mockDestination = [
  {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    cityName: 'New York',
    photos: getRandomPhotosURL()
  },
  {
    description: 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    cityName: 'London',
    photos: getRandomPhotosURL()
  },
  {
    description: 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    cityName: 'Moscow',
    photos: getRandomPhotosURL()
  }
];

// Дополнительные опции
const mockOffers = [
  {
    type: getRandomArrayElement(EVENTS_TYPES),
    offers: [
      {
        id: 'Upgrade',
        title: 'Upgrade to a business class',
        price: 120,
        checked: false
      }
    ]
  },
  {
    type: getRandomArrayElement(EVENTS_TYPES),
    offers: [
      {
        id: 'Nunc',
        title: 'Nunc fermentum',
        price: 100,
        checked: false
      },
      {
        id: 'Phasellus',
        title: 'Phasellus',
        price: 50,
        checked: true
      }
    ]
  },
  {
    type: getRandomArrayElement(EVENTS_TYPES),
    offers: [
      {
        id: 'In',
        title: 'In rutrum',
        price: 80,
        checked: true
      },
      {
        id: 'Sed',
        title: 'Sed blandit',
        price: 15,
        checked: true
      },
      {
        id: 'Nullam',
        title: 'Nullam nunc ex',
        price: 25,
        checked: false
      }
    ]
  }
];

const mockEvents = [
  {
    type: mockOffers[0].type,
    destination: {
      description: mockDestination[0].description,
      cityName: mockDestination[0].cityName,
      photos: ''
    },
    dateFrom: '2019-07-10T09:15:56.845Z',
    dateTo: '2019-07-11T04:55:13.375Z',
    basePrice: 1100,
    offers: [
      mockOffers[0].offers[0]
    ],
    isFavorite: false,
  },
  {
    type: mockOffers[1].type,
    destination: {
      description: '',
      cityName: mockDestination[1].cityName,
      photos: ''
    },
    dateFrom: '2019-08-15T09:45:56.845Z',
    dateTo: '2019-08-17T09:50:13.375Z',
    basePrice: 870,
    offers: [
      mockOffers[1].offers[0],
      mockOffers[1].offers[1],
    ],
    isFavorite: true,
  },
  {
    type: mockOffers[2].type,
    destination: {
      description: mockDestination[2].description,
      cityName: mockDestination[2].cityName,
      photos: mockDestination[2].photos
    },
    dateFrom: '2019-09-25T13:00:56.845Z',
    dateTo: '2019-09-25T13:35:13.375Z',
    basePrice: 1250,
    offers: [
      mockOffers[2].offers[0],
      mockOffers[2].offers[1],
      mockOffers[2].offers[2]
    ],
    isFavorite: false,
  },
  {
    type: mockOffers[1].type,
    destination: {
      description: mockDestination[1].description,
      cityName: mockDestination[1].cityName,
      photos: mockDestination[1].photos
    },
    dateFrom: '2019-09-25T13:00:56.845Z',
    dateTo: '2019-09-25T13:35:13.375Z',
    basePrice: 1250,
    offers: [],
    isFavorite: true,
  },
  {
    type: mockOffers[2].type,
    destination: {
      description: mockDestination[2].description,
      cityName: mockDestination[2].cityName,
      photos: mockDestination[2].photos
    },
    dateFrom: '2019-09-25T13:00:56.845Z',
    dateTo: '2019-09-25T13:35:13.375Z',
    basePrice: 1250,
    offers: [
      mockOffers[2].offers[0],
      mockOffers[2].offers[1],
      mockOffers[2].offers[2]
    ],
    isFavorite: true,
  }
];

const getRandomEvent = () => getRandomArrayElement(mockEvents);

export { getRandomEvent };

// import { getRandomArrayElement, getRandomPhotosURL } from '../utils.js';
// import { EVENTS_TYPES } from '../const.js';
//
// // Пункт назначения
// const mockDestination = [
//   {
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
//     cityName: 'New York',
//     photos: [
//       getRandomPhotosURL()
//     ]
//   },
//   {
//     description: 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
//     cityName: 'London',
//     photos: [
//       getRandomPhotosURL()
//     ]
//   },
//   {
//     description: 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
//     cityName: 'Moscow',
//     photos: [
//       getRandomPhotosURL()
//     ]
//   }
// ];
//
// // Дополнительные опции
// const mockOffers = [
//   {
//     type: getRandomArrayElement(EVENTS_TYPES),
//     offers: [
//       {
//         id: 'Upgrade',
//         title: 'Upgrade to a business class',
//         price: 120,
//         checked: false
//       }
//     ]
//   },
//   {
//     type: getRandomArrayElement(EVENTS_TYPES),
//     offers: [
//       {
//         id: 'Nunc',
//         title: 'Nunc fermentum',
//         price: 100,
//         checked: false
//       },
//       {
//         id: 'Phasellus',
//         title: 'Phasellus',
//         price: 50,
//         checked: true
//       }
//     ]
//   },
//   {
//     type: getRandomArrayElement(EVENTS_TYPES),
//     offers: [
//       {
//         id: 'In',
//         title: 'In rutrum',
//         price: 80,
//         checked: true
//       },
//       {
//         id: 'Sed',
//         title: 'Sed blandit',
//         price: 15,
//         checked: true
//       },
//       {
//         id: 'Nullam',
//         title: 'Nullam nunc ex',
//         price: 25,
//         checked: false
//       }
//     ]
//   }
// ];
//
// const mockEvents = [
//   {
//     type: mockOffers[0].type,
//     destination: [
//       mockDestination[0].description,
//       mockDestination[0].cityName,
//       mockDestination[0].photos
//     ],
//     dateFrom: '2019-07-10T09:15:56.845Z',
//     dateTo: '2019-07-11T04:55:13.375Z',
//     basePrice: 1100,
//     offers: [
//       mockOffers[0].offers[0]
//     ],
//     isFavorite: false,
//   },
//   {
//     type: mockOffers[1].type,
//     destination: [
//       mockDestination[1].description,
//       mockDestination[1].cityName,
//       mockDestination[1].photos
//     ],
//     dateFrom: '2019-08-15T09:45:56.845Z',
//     dateTo: '2019-08-17T09:50:13.375Z',
//     basePrice: 870,
//     offers: [
//       mockOffers[1].offers[0],
//       mockOffers[1].offers[1],
//     ],
//     isFavorite: true,
//   },
//   {
//     type: mockOffers[2].type,
//     destination: [
//       mockDestination[2].description,
//       mockDestination[2].cityName,
//       mockDestination[2].photos
//     ],
//     dateFrom: '2019-09-25T13:00:56.845Z',
//     dateTo: '2019-09-25T13:35:13.375Z',
//     basePrice: 1250,
//     offers: [
//       mockOffers[2].offers[0],
//       mockOffers[2].offers[1],
//       mockOffers[2].offers[2]
//     ],
//     isFavorite: false,
//   }
// ];
//
// const getRandomEvent = () => getRandomArrayElement(mockEvents);
//
// export { getRandomEvent };
