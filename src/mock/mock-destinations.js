import { PHOTO_URL } from '../const.js';

// Функция для генерации случайных URL фотографий
const getRandomPhotoURL = () => {
  const randomNumber = Math.floor(Math.random() * 100) + 1; // Генерируем случайное число от 1 до 100
  return `${PHOTO_URL}${randomNumber}`;
};

// Пункты назначения
const mockDestinations = [
  {
    id: '1',
    description: 'New York ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    name: 'New York',
    pictures: [],
  },
  {
    id: '2',
    description: 'London ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    name: 'London',
    pictures: [
      {
        src: getRandomPhotoURL(),
        description: 'London picture 2'
      },
      {
        src: getRandomPhotoURL(),
        description: 'London picture 3'
      }
    ]
  },
  {
    id: '3',
    description: 'Moscow ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    name: 'Moscow',
    pictures: [
      {
        src: getRandomPhotoURL(),
        description: 'Moscow picture 4'
      },
      {
        src: getRandomPhotoURL(),
        description: 'Moscow picture 5'
      },
      {
        src: getRandomPhotoURL(),
        description: 'Moscow picture 6'
      }
    ]
  }
];

export { mockDestinations };
