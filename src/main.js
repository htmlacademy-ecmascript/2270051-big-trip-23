import MainPresenter from './presenter/main-presenter.js';
import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import { render, RenderPosition } from './render.js';

// Поиск элементов в DOM, которые будут использоваться для рендеринга компонентов шапки сайта
const pageHeaderElement = document.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const tripFiltersElement = pageHeaderElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

// Рендеринг шапки сайта
render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

// Рендеринг фильтров
render(new FilterView(), tripFiltersElement);

// Создание экземпляра MainPresenter
const mainPresenter = new MainPresenter({container: tripEventsElement});

mainPresenter.init();
