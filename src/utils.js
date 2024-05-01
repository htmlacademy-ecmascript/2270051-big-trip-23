import { PHOTO_COUNT, PHOTO_URL, DATE_FORMAT, TIME_FORMAT } from './const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const getRandomArrayElement = ((items) => items[Math.floor(Math.random() * items.length)]);

// Функция для генерации случайных URL фотографий
const getRandomPhotosURL = () => {
  const photos = [];
  for (let i = 0; i < PHOTO_COUNT; i++) {
    const randomNumber = Math.floor(Math.random() * 100) + 1; // Генерируем случайное число от 1 до 100
    photos.push(`${PHOTO_URL}${randomNumber}`);
  }
  return photos;
};

// Функция для форматирования даты
const getFormattedDate = (dateString) => dayjs(dateString).format(DATE_FORMAT);

// Функция для форматирования времени
const getFormattedTime = (dateString) => dayjs(dateString).format(TIME_FORMAT);

// Функция для вычисления продолжительности в днях, часах и минутах
const getDuration = (dateFrom, dateTo) => {
  // Обрезаем до минут начальную и конечную даты
  const start = dayjs(dateFrom).startOf('minute');
  const end = dayjs(dateTo).startOf('minute');
  const diffInMs = end.diff(start); // Вычисляем разницу в миллисекундах
  // eslint-disable-next-line no-shadow
  const duration = dayjs.duration(diffInMs); // Создаем объект длительности с разницей в миллисекундах

  // Получаем количество целых дней, часов, минут
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();

  // Форматируем длительность в строку в формате "DDDH HHM" или "HHM" или "MM"
  if (days > 0) {
    return `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else {
    return `${minutes}M`;
  }
};

export { getRandomArrayElement, getRandomPhotosURL, getFormattedDate, getFormattedTime, getDuration };
