import MainPresenter from './presenter/main-presenter.js';
import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import { render, RenderPosition } from './render.js';
import EventModel from './model/event-model.js';

// Поиск элементов в DOM, которые будут использоваться для рендеринга компонентов шапки сайта
const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

// Рендеринг шапки сайта
render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

// Рендеринг фильтров
render(new FilterView(), tripFiltersElement);

// Создание экземпляра EventModel
const eventModel = new EventModel();

// Создание экземпляра MainPresenter
const mainPresenter = new MainPresenter({
  container: tripEventsElement,
  eventModel
});

mainPresenter.init();
