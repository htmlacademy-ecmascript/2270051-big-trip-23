import { render, RenderPosition } from './framework/render.js';
import MainPresenter from './presenter/main-presenter.js';
import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import EventModel from './model/event-model.js';
import FilterModel from './model/filter-model.js';
import { Filters } from './const.js';

const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

const eventModel = new EventModel();
const filterModel = new FilterModel();

const mainPresenter = new MainPresenter({
  container: tripEventsElement,
  eventModel,
  filterModel
});

const filterView = new FilterView({
  filters: Object.values(Filters),
  currentFilter: filterModel.filter,
  onFilterChange: (filter) => {
    filterModel.setFilter(filter);
  },
  isDisabled: !eventModel.hasEvents()
});

render(filterView, tripFiltersElement);

mainPresenter.init();
