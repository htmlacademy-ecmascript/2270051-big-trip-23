import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {BLANK_EVENT} from '../const.js';
import {getFormattedDate} from '../utils/utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createPointTemplate = (eventType, eventId, type) => `
  <div class="event__type-item">
    <input id="event-type-${eventType}-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}" ${eventType === type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-${eventId}">${eventType.charAt(0).toUpperCase() + eventType.slice(1)}</label>
  </div>`;

const createDestinationOptionTemplate = (name) => `<option value="${name}"></option>`;

const createOffersItemTemplate = ({id, title, price, checked}) => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" ${checked ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;

const createOffersTemplate = (allOffers, eventOffers) => {
  if (!allOffers || allOffers.length === 0) {
    return '';
  }

  const offersTemplate = allOffers.reduce((acc, offer) => {
    const checked = eventOffers.some((eventOffer) => eventOffer.id === offer.id);
    return acc + createOffersItemTemplate({...offer, checked});
  }, '');

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersTemplate}
      </div>
    </section>`;
};

const createPhotosTemplate = (photos) => {
  const photosList = photos.map((photo) => `
    <img class="event__photo" src="${photo.src}" alt="${photo.description}">`
  ).join('');

  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photosList}
      </div>
    </div>`;
};

const createDestinationTemplate = (description, photos) => {
  if (!description || description.length === 0) {
    return '';
  }

  return `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${createPhotosTemplate(photos)}
  </section>`;
};

const createFormTemplate = (event, destinations, offers) => {
  const {type, dateFrom, dateTo, basePrice} = event;
  const eventId = event.id || 0;
  const eventTypes = offers.map((offer) => offer.type);
  const destinationNames = destinations.map((destination) => destination.name);
  const eventDestination = destinations.find((destination) => destination.id === event.destination);
  const eventAllOffers = offers.find((offer) => offer.type === event.type)?.offers || [];
  const eventOffers = event.offers.map((offerId) => eventAllOffers.find((offer) => offer.id === offerId)).filter(Boolean);
  const offersTemplate = createOffersTemplate(eventAllOffers, eventOffers);
  const destinationTemplate = createDestinationTemplate(eventDestination.description, eventDestination.pictures);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${eventId}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${eventId}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${eventTypes.map((eventType) => createPointTemplate(eventType, eventId, type)).join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${eventId}">
              ${type}
            </label>
            <input class="event__input  event__input--destination"
            id="event-destination-${eventId}"
            type="text"
            name="event-destination"
            value="${eventDestination.name}"
            list="destination-list-${eventId}">
            <datalist id="destination-list-${eventId}">
              ${destinationNames.map((destinationName) => createDestinationOptionTemplate(destinationName)).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${eventId}">From</label>
            <input class="event__input  event__input--time"
            id="event-start-time-${eventId}"
            type="text"
            name="event-start-time"
            value="${getFormattedDate(dateFrom, 'DD/MM/YY HH:mm')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${eventId}">To</label>
            <input class="event__input  event__input--time"
            id="event-end-time-${eventId}"
            type="text"
            name="event-end-time"
            value="${getFormattedDate(dateTo, 'DD/MM/YY HH:mm')}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${eventId}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${eventId}" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${offersTemplate}
          ${destinationTemplate}
        </section>
      </form>
    </li>`);
};

export default class FormView extends AbstractStatefulView {
  #event = null;
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleEditClick = null;
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor({event = BLANK_EVENT, destinations, offers, onFormSubmit, onEditClick}) {
    super();
    this._state = {...event};
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleEditClick = onEditClick;
    this._restoreHandlers();
  }

  get template() {
    return createFormTemplate(this._state, this.#destinations, this.#offers);
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);

    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  resetForm(event) {
    this.updateElement(event);
    this.#dateFromPicker.setDate(event.dateFrom);
    this.#dateToPicker.setDate(event.dateTo);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit({...this._state});
  };

  #editClickHandler = () => {
    this.#handleEditClick();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      ...this.#event,
      type: evt.target.value,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    const destinationSection = this.element.querySelector('.event__section--destination');

    if (selectedDestination) {
      this.updateElement({
        ...this.#event,
        destination: selectedDestination.id
      });
      destinationSection.style.display = 'block';
    } else {
      destinationSection.style.display = 'none';
    }
  };

  #dateFromChangeHandler = ([date]) => {
    if (date > this._state.dateTo) {
      this.updateElement({
        ...this._state,
        dateFrom: date,
        dateTo: date
      });

      this.#dateToPicker.setDate(date);
    } else {
      this.updateElement({
        ...this._state,
        dateFrom: date
      });
    }

    this.#dateToPicker.set('minDate', date);
  };

  #dateToChangeHandler = ([date]) => {
    this.updateElement({
      ...this._state,
      dateTo: date
    });

    this.#dateToPicker.setDate(date);
  };

  #setDateFromPicker() {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector(`#event-start-time-${this._state.id}`),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y h:i',
        minuteIncrement: 1,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler
      });
  }

  #setDateToPicker() {
    this.#dateToPicker = flatpickr(
      this.element.querySelector(`#event-end-time-${this._state.id}`),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y h:i',
        minuteIncrement: 1,
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler
      });
  }
}
