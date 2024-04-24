// Импорт необходимых классов представлений и функции рендеринга
import TripMainView from '../view/trip-main.js';
import FiltersView from '../view/filters.js';
import SortingView from '../view/sorting.js';
import WaypointView from '../view/waypoint.js';
import WaypointEditFormView from '../view/editing-form.js';
import NewWaypointFormView from '../view/creation-form.js';
import {render, RenderPosition} from '../render.js';

export default class GeneralPresenter {
  constructor() {
    // Поиск элементов в DOM, которые будут использоваться для рендеринга компонентов
    this.pageHeader = document.querySelector('.page-header');
    this.tripMain = this.pageHeader.querySelector('.trip-main');
    this.tripControlsFilters = this.pageHeader.querySelector('.trip-controls__filters');
    this.pageMain = document.querySelector('.page-main');
    this.tripEvents = this.pageMain.querySelector('.trip-events');

    // Создание списка для точек путешествия и добавление его в элемент trip-events
    this.waypointList = document.createElement('ul');
    this.waypointList.classList.add('trip-events__list');
    this.tripEvents.appendChild(this.waypointList);
  }

  // Рендеринг основного представления
  renderTripMain() {
    render(new TripMainView(), this.tripMain, RenderPosition.AFTERBEGIN);
  }

  // Рендеринг фильтров
  renderFilters() {
    render(new FiltersView(), this.tripControlsFilters);
  }

  // Рендеринг сортировки
  renderSorting() {
    render(new SortingView(), this.tripEvents, RenderPosition.AFTERBEGIN);
  }

  // Рендеринг трех точек путешествия
  renderWaypoints() {
    for (let i = 0; i < 3; i++) {
      render(new WaypointView(), this.waypointList);
    }
  }

  // Рендеринг формы редактирования точки путешествия
  renderWaypointEditForm() {
    render(new WaypointEditFormView(), this.waypointList, RenderPosition.AFTERBEGIN);
  }

  // Рендеринг формы создания новой точки путешествия
  renderNewWaypointForm() {
    render(new NewWaypointFormView(), this.waypointList, RenderPosition.AFTERBEGIN);
  }

  // Точка входа для инициализации представления
  init() {
    this.renderTripMain();
    this.renderFilters();
    this.renderSorting();
    this.renderWaypoints();
    this.renderWaypointEditForm();
    this.renderNewWaypointForm();
  }
}
