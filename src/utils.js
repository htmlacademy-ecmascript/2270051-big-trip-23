import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const getRandomArrayElement = ((items) => items[Math.floor(Math.random() * items.length)]);

// Функция для форматирования даты
const getFormattedDate = (dateString, format) => dayjs(dateString).format(format);

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
  }

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  }

  return `${minutes}M`;
};

// Функция получения активного класса
const getActiveClass = (isActive, activeClass) => isActive ? activeClass : '';

export { getRandomArrayElement, getFormattedDate, getDuration, getActiveClass };
