// Импорт необходимых классов представлений и функции рендеринга
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import FormView from '../view/form-view.js';
import { render, RenderPosition } from '../render.js';

export default class MainPresenter {
  sortComponent = new SortView();
  eventsListComponent = new EventsListView();
  formComponent = new FormView();

  constructor({container, eventsModel}) {
    this.container = container;
    this.eventsModel = eventsModel;
  }

  // Точка входа для инициализации представления
  init() {
    this.events = [...this.eventsModel.getEvents()];

    // Рендеринг сортировки
    render(this.sortComponent, this.container);

    // Рендеринг списка путешествий
    render(this.eventsListComponent, this.sortComponent.getElement(), RenderPosition.AFTEREND);

    // Рендеринг точек путешествия
    for (let i = 0; i < this.events.length; i++) {
      const eventViewComponent = new EventView({event: this.events[i]}); // Создаю новый экземпляр для каждой точки
      render(eventViewComponent, this.eventsListComponent.getElement(), RenderPosition.BEFOREEND);
    }

    // Рендеринг формы создания/редактирования точки путешествия
    render(this.formComponent, this.eventsListComponent.getElement(), RenderPosition.AFTERBEGIN);
  }
}

