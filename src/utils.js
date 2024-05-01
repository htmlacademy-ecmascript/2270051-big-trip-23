import { PHOTO_COUNT, PHOTO_URL } from './const.js';

const getRandomArrayElement = ((items) => items[Math.floor(Math.random() * items.length)]);

const getRandomPhotos = () => {
  const photos = [];
  for (let i = 0; i < PHOTO_COUNT; i++) {
    const randomNumber = Math.floor(Math.random() * 100) + 1; // Генерируем случайное число от 1 до 100
    photos.push(`${PHOTO_URL}${randomNumber}`);
  }
  return photos;
};

export { getRandomArrayElement, getRandomPhotos };
