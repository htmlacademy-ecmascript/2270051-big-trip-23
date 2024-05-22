import AbstractView from '../framework/view/abstract-view.js';
import { getFormattedDate, getDuration, getActiveClass } from '../utils.js';

const createOffersTemplate = (offers) => {
  if (!offers || offers.length === 0) {
    return '';
  }

  const offersList = offers.map((offer) => `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`).join('');

  return `<ul class="event__selected-offers">${offersList}</ul>`;
};

const createEventTemplate = (event, destinations, offers) => {
  const {type, dateFrom, dateTo, basePrice, isFavorite} = event;
  const eventDestination = destinations.find((destination) => destination.id === event.destination);
  const eventDestinationName = eventDestination?.name || '';
  const eventAllOffers = offers.find((offer) => offer.type === event.type).offers;
  const eventOffers = eventAllOffers.filter((eventOffer) => event.offers.includes(eventOffer.id));
  const favoriteButtonClass = getActiveClass(isFavorite, 'event__favorite-btn--active');
  const offersTemplate = createOffersTemplate(eventOffers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${getFormattedDate(dateFrom, 'YYYY-MM-DD')}">${getFormattedDate(dateFrom, 'MMM DD')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${eventDestinationName}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getFormattedDate(dateFrom, 'YYYY-MM-DDTHH:mm')}">${getFormattedDate(dateFrom, 'HH:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime="${getFormattedDate(dateTo, 'YYYY-MM-DDTHH:mm')}">${getFormattedDate(dateTo, 'HH:mm')}</time>
          </p>
          <p class="event__duration">${getDuration(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${offersTemplate}
        <button class="event__favorite-btn ${favoriteButtonClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`);
};

export default class EventView extends AbstractView {
  #event = null;
  #destinations = null;
  #offers = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({event, destinations, offers, onEditClick, onFavoriteClick}) {
    super();
    this.#event = event;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createEventTemplate(this.#event, this.#destinations, this.#offers);
  }

  #editClickHandler = () => {
    this.#handleEditClick();
  };

  #favoriteClickHandler = () => {
    this.#handleFavoriteClick();
  };

  resetView() {
    this.element.innerHTML = this.template;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }
}
