import MainPresenter from './presenter/main-presenter.js';
import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import { render, RenderPosition } from './render.js';

// Поиск элементов в DOM, которые будут использоваться для рендеринга компонентов шапки сайта
const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripFilters = pageHeader.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

// Создание экземпляра MainPresenter
const mainPresenter = new MainPresenter({container: tripEvents});

// Рендеринг шапки сайта
render(new TripInfoView(), tripMain, RenderPosition.AFTERBEGIN);

// Рендеринг фильтров
render(new FilterView(), tripFilters);

mainPresenter.init();
