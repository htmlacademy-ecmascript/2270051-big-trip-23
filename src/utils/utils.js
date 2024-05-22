import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getRandomArrayElement = ((items) => items[Math.floor(Math.random() * items.length)]);

export const getFormattedDate = (dateString, format) => dayjs(dateString).format(format);

export const getDuration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom).startOf('minute');
  const end = dayjs(dateTo).startOf('minute');
  const diffInMs = end.diff(start);
  // eslint-disable-next-line no-shadow
  const duration = dayjs.duration(diffInMs);
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();

  if (days > 0) {
    return `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  }

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  }

  return `${minutes}M`;
};

export const getActiveClass = (isActive, activeClass) => isActive ? activeClass : '';

export const updateData = (data, update) => data.map((item) => item.id === update.id ? update : item);

export const updateItem = (item, prop) => ({...item, ...prop});
