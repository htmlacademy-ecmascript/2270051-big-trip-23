export const sortByDay = (eventA, eventB) => {
  const dateA = new Date(eventA.dateFrom);
  const dateB = new Date(eventB.dateFrom);
  return dateA - dateB;
};

export const sortByTime = (eventA, eventB) => {
  const durationA = new Date(eventA.dateTo).getTime() - new Date(eventA.dateFrom).getTime();
  const durationB = new Date(eventB.dateTo).getTime() - new Date(eventB.dateFrom).getTime();

  return durationB - durationA;
};

export const sortByPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;
