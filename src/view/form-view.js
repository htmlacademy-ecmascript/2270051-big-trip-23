import { createElement } from '../render.js';
import { EVENTS_TYPES, FLIGHT_OFFERS } from '../const.js';

// Форма по умолчанию
const BLANK_EVENT = {
  type: 'flight',
  destination: '',
  dateFrom: '',
  dateTo: '',
  basePrice: 0,
  offers: FLIGHT_OFFERS
};

// Функция создания разметки выбора типа точки маршрута
const createPointTemplate = (type) => `
  <div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
  </div>`;

// Функция создания разметки для отдельной дополнительной опции
const createOffersItemTemplate = ({id, title, price, checked}) => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" ${checked ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;

// Функция создания разметки дополнительных опций
const createOffersTemplate = (offers) => {
  if (!offers || offers.length === 0) {
    return ''; // Возвращаем пустую строку, если offers пуст или не существует
  }

  const offersTemplate = offers.reduce((accumulator, offer) => accumulator + createOffersItemTemplate(offer), '');

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersTemplate}
      </div>
    </section>`;
};

// Функция создания картинок места назначения
const createPhotosTemplate = (photos) => {
  if (!photos || photos.length === 0) {
    return ''; // Возвращаем пустую строку, если photos пуст или не существует
  }

  // Создаем картинки
  const photosList = photos.map((photo) => `
    <img class="event__photo" src="${photo}" alt="Event photo">`
  ).join('');

  // Возвращаем обернутый блок картинок
  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photosList}
      </div>
    </div>`;
};

// Функция создания разметки места назначения
const createDestinationTemplate = (description, photos) => {
  if (!description || description.length === 0) {
    return ''; // Возвращаем пустую строку, если description пуст или не существует
  }

  // Возвращаем блок разметки места назначения
  return `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${createPhotosTemplate(photos)}
  </section>`;
};

// Функция создания разметки всей формы
const createFormTemplate = (data) => {
  const {type, destination, basePrice, offers} = data;

  // Отрисовка блока дополнительных опций
  const offersTemplate = createOffersTemplate(offers);

  // Отрисовка блока места назначения
  const destinationTemplate = createDestinationTemplate(destination.description, destination.photos);

  // !TODO доделать атрибут value в классе event__field-group--time

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${EVENTS_TYPES.map((typeItem) => createPointTemplate(typeItem)).join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.cityName}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          ${offersTemplate}
          ${destinationTemplate}
        </section>
      </form>
    </li>`);
};

export default class FormView {
  constructor({event = BLANK_EVENT}) {
    this.event = event;
  }

  getTemplate() {
    return createFormTemplate(this.event);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
