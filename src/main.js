import TripMainView from './view/trip-main.js';
import FiltersView from './view/filters.js';
import SortingView from './view/sorting.js';
import WaypointView from './view/waypoint.js';
import NewWaypointFormView from './view/creation-form.js';
import WaypointEditFormView from './view/editing-form.js';
import {render, RenderPosition} from './render.js';

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControlsFilters = pageHeader.querySelector('.trip-controls__filters');

const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

const waypointList = document.createElement('ul');
waypointList.classList.add('trip-events__list');
tripEvents.appendChild(waypointList);

for (let i = 0; i < 3; i++) {
  render(new WaypointView(), waypointList);
}

render(new TripMainView(), tripMain, RenderPosition.AFTERBEGIN);
render(new FiltersView(), tripControlsFilters);
render(new SortingView(), tripEvents, RenderPosition.AFTERBEGIN);
render(new NewWaypointFormView(), waypointList, RenderPosition.AFTERBEGIN);
render(new WaypointEditFormView(), waypointList, RenderPosition.AFTERBEGIN);

