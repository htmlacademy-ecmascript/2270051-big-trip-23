import { render, RenderPosition } from './framework/render.js';
import MainPresenter from './presenter/main-presenter.js';
import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import EventModel from './model/event-model.js';
import { Filters } from './const.js';

// Поиск элементов в DOM, которые будут использоваться для рендеринга компонентов шапки сайта
const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

// Рендеринг шапки сайта
render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

// Создание экземпляра EventModel
const eventModel = new EventModel();

// Создание экземпляра MainPresenter
const mainPresenter = new MainPresenter({
  container: tripEventsElement,
  eventModel
});

// Создание экземпляра FilterView с обработчиком изменения фильтра
const filterView = new FilterView({
  filters: Object.values(Filters),
  currentFilter: eventModel.filter,
  onFilterChange: (filter) => {
    eventModel.setFilter(filter);
    mainPresenter.updateView();
  }
});

// Рендеринг фильтров
render(filterView, tripFiltersElement);

mainPresenter.init();
