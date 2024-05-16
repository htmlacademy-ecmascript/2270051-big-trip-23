import { render, RenderPosition } from './framework/render.js';
import MainPresenter from './presenter/main-presenter.js';
import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import EventModel from './model/event-model.js';
import FilterModel from './model/filter-model.js';
import { Filters } from './const.js';

// Поиск элементов в DOM, которые будут использоваться для рендеринга компонентов шапки сайта
const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

// Рендеринг шапки сайта
render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

// Создание экземпляра EventModel
const eventModel = new EventModel();

// Создание экземпляра FilterModel
const filterModel = new FilterModel();

// Создание экземпляра MainPresenter
const mainPresenter = new MainPresenter({
  container: tripEventsElement,
  eventModel,
  filterModel
});

// Создание экземпляра FilterView с обработчиком изменения фильтра
const filterView = new FilterView({
  filters: Object.values(Filters),
  currentFilter: filterModel.filter,
  onFilterChange: (filter) => {
    filterModel.setFilter(filter);
  },
  isDisabled: !eventModel.hasEvents()
});

// Рендеринг фильтров
render(filterView, tripFiltersElement);

mainPresenter.init();
