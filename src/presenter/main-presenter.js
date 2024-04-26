// Импорт необходимых классов представлений и функции рендеринга
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventsItemView from '../view/events-item-view.js';
import EventView from '../view/event-view.js';
import FormView from '../view/form-view.js';
import { render, RenderPosition } from '../render.js';
import { AMOUNT_OF_POINTS } from '../constants.js';

export default class MainPresenter {
  sortComponent = new SortView();
  eventsListComponent = new EventsListView();
  eventsItemComponent = new EventsItemView();
  formComponent = new FormView();

  constructor({container}) {
    this.container = container;
  }

  // Точка входа для инициализации представления
  init() {

    // Рендеринг сортировки
    render(this.sortComponent, this.container);

    // Рендеринг списка путешествий
    render(this.eventsListComponent, this.sortComponent.getElement(), RenderPosition.AFTEREND);

    // Рендеринг элементов списка путешествий
    for (let i = 0; i < AMOUNT_OF_POINTS; i++) {
      const eventsItemView = new EventsItemView();
      render(eventsItemView, this.eventsListComponent.getElement(), RenderPosition.BEFOREEND);

      // Рендеринг точек путешествия внутри элемента списка путешествий
      const eventView = new EventView();
      render(eventView, eventsItemView.getElement(), RenderPosition.BEFOREEND);
    }

    // Рендеринг формы создания/редактирования точки путешествия внутри элемента списка путешествий
    render(this.eventsItemComponent, this.eventsListComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(this.formComponent, this.eventsItemComponent.getElement(), RenderPosition.AFTERBEGIN);
  }
}

