/* eslint-disable no-return-assign */
import { EventEmitter, createElement } from './helpers';

class View extends EventEmitter {
  constructor() {
    super();
    // список ингридиентов
    this.ingredientForm = document.getElementById('ingredient-form');
    this.ingredientInput = document.getElementById('ingredient-input');
    this.ingredientList = document.getElementById('ingredient-list');
    // вешаем хэндлеры на статические элементы
    [...this.ingredientList.children].forEach(item =>
      item.addEventListener('dragstart', this.handleDragStart.bind(this))
    );
    this.ingredientForm.addEventListener('submit', this.handleAdd.bind(this));
    // список рецептов
    this.recipeForm = document.getElementById('recipe-form');
    this.recipeInput = document.getElementById('recipe-input');
    this.recipeInput1 = document.getElementById('recipe-input1');
    this.recipeInput2 = document.getElementById('recipe-input2');
    this.recipeInput3 = document.getElementById('recipe-input3');
    this.recipeList = document.getElementById('recipe-list');
    // вешаем хэндлеры на статические элементы
    [...this.recipeList.children].forEach(item =>
      item.addEventListener('dragstart', this.handleDragStart.bind(this))
    );
    this.recipeForm.addEventListener('submit', this.handleAdd.bind(this));
    // рабочая область
    this.workList = document.getElementById('work-list');
    this.workList.addEventListener('dragover', this.handleDragOver.bind(this));
    this.workList.addEventListener('dragenter', this.handleDragEnter.bind(this));
    this.workList.addEventListener('dragleave', this.handleDragLeave.bind(this));
    this.workList.addEventListener('drop', this.handleDrop.bind(this));
    // вешаем хэндлеры на статические элементы
    this.removeButtons = document.querySelectorAll('button.remove');
    this.removeButtons.forEach(item =>
      item.addEventListener('click', this.handleRemove.bind(this))
    );
    this.craftButton = document.getElementById('craft-button');
    this.craftButton.addEventListener('click', this.handleCraft.bind(this));
  }

  // новый ингридиент
  createIngredient(ingredient) {
    const label = createElement('label', { className: 'title' }, ingredient.title[0]);
    const deleteButton = createElement('button', { className: 'remove' }, 'delete');
    const item = createElement(
      'li',
      {
        className: 'ingredient-item',
        draggable: 'true',
        'data-id': ingredient.title[0].toLowerCase(),
      },
      label,
      deleteButton
    );

    return this.addListeners(item);
  }

  // новый рецепт
  createRecipe(recipe) {
    const label = createElement('label', { className: 'title' }, recipe.title[0]);
    const span1 = createElement('span', {}, recipe.title[1]);
    const span2 = createElement('span', {}, recipe.title[2]);
    const span3 = createElement('span', {}, recipe.title[3]);
    const deleteButton = createElement('button', { className: 'remove' }, 'delete');
    const item = createElement(
      'li',
      {
        className: 'recipe-item',
        draggable: 'true',
        'data-id': `${recipe.title[0].toLowerCase()}-recipe`,
      },
      label,
      span1,
      span2,
      span3,
      deleteButton
    );

    return this.addListeners(item);
  }

  // вешаем хэндлеры на новые элементы
  addListeners(item) {
    const removeButton = item.querySelector('button.remove');
    removeButton.addEventListener('click', this.handleRemove.bind(this));
    item.addEventListener('dragstart', this.handleDragStart.bind(this));
    return item;
  }

  // поиск элемента
  // eslint-disable-next-line class-methods-use-this
  findItem(id) {
    return document.querySelector(`[data-id="${id}"]`);
  }

  // хэндлеры drag and drop
  // eslint-disable-next-line class-methods-use-this
  handleDragStart(event) {
    event.dataTransfer.setData('text', event.target.getAttribute('data-id'));
  }

  handleDragOver(event) {
    event.preventDefault();
    this.workList.style.border = '1px dashed #111';
  }

  handleDragEnter(event) {
    event.preventDefault();
    this.workList.style.border = '1px dashed #111';
  }

  handleDragLeave(event) {
    event.preventDefault();
    this.workList.style.border = '1px solid transparent';
  }

  handleDrop(event) {
    event.preventDefault();
    this.workList.style.border = '1px solid transparent';
    this.newWorkItem = document
      .querySelector(`[data-id="${event.dataTransfer.getData('text')}"]`)
      .cloneNode(true);
    this.newWorkItem.setAttribute('draggable', false);
    this.newWorkItem.setAttribute('data-id', `${event.dataTransfer.getData('text')}-craft`);
    this.newWorkItem.classList.add('work-item');
    this.newWorkItem
      .querySelector('button.remove')
      .addEventListener('click', this.handleRemove.bind(this));
    // проверки есть ли уже такой рецепт\ингредиент, есть ли уже какой-нибудь рецепт
    this.workListItems = Array.from(this.workList.childNodes).reduce(
      (acc, elem) => [...acc, elem.getAttribute('data-id')],
      []
    );
    if (
      this.workListItems.includes(this.newWorkItem.getAttribute('data-id')) ||
      this.workListItems.includes(this.newWorkItem.getAttribute('data-id').replace('-recipe', ''))
    ) {
      // eslint-disable-next-line no-alert
      alert(
        `${this.newWorkItem
          .getAttribute('data-id')
          .slice(0, -6)
          .replace('-recipe', '')} is already on working table`
      );
    } else if (
      this.workListItems
        .join()
        .includes(
          this.newWorkItem
            .getAttribute('data-id')
            .slice(0, this.newWorkItem.getAttribute('data-id').length - 6)
        )
    ) {
      // eslint-disable-next-line no-alert
      alert(
        `${this.newWorkItem
          .getAttribute('data-id')
          .slice(0, this.newWorkItem.getAttribute('data-id').length - 6)} already on working table`
      );
    } else if (
      this.workListItems.join().includes(this.newWorkItem.getAttribute('data-id').slice(-12, -6))
    ) {
      // eslint-disable-next-line no-alert
      alert('one recipe is already on working table');
    } else {
      this.workList.appendChild(this.newWorkItem);
    }
  }

  // удалить элемент
  handleRemove(event) {
    event.preventDefault();
    this.emit('removeItem', event.target.parentNode.getAttribute('data-id'));
  }

  removeItem(id) {
    const listItem = this.findItem(id);
    listItem.parentNode.removeChild(listItem);
  }

  // добавить элемент
  // eslint-disable-next-line consistent-return
  handleAdd(event) {
    event.preventDefault();
    const ids = Array.from(event.target.parentNode.querySelectorAll('label')).reduce(
      (acc, elem) => [...acc, elem.textContent.toLowerCase()],
      []
    );
    const value = Array.from(event.target.parentNode.querySelectorAll('input')).reduce(
      (acc, elem) => [...acc, elem.value.toLowerCase()],
      []
    );
    // проверки
    if (!value[0]) {
      // eslint-disable-next-line no-alert
      return alert(`enter ${event.target.parentNode.id.slice(0, -4)} name`);
    }
    if (ids.includes(value[0].toLowerCase())) {
      // eslint-disable-next-line no-alert
      return alert(`this ${event.target.parentNode.id.slice(0, -4)} already exist`);
    }
    if (value.length > 1 && value[1] === '' && value[2] === '' && value[3] === '') {
      // eslint-disable-next-line no-alert
      return alert(`enter at least 1 ingredient name`);
    }
    this.emit('addItem', value);
  }

  addItem(item) {
    const parentList =
      // eslint-disable-next-line no-restricted-globals
      event.target.parentNode.id === 'recipeList' ? 'recipeList' : 'ingredientList';
    const listItem =
      parentList === 'recipeList' ? this.createRecipe(item) : this.createIngredient(item);
    document
      .getElementById(parentList)
      .querySelectorAll('input')
      // eslint-disable-next-line no-param-reassign
      .forEach(input => (input.value = ''));
    document
      .getElementById(parentList)
      .querySelector('ul')
      .appendChild(listItem);
  }

  // крафтим новый элемент
  // eslint-disable-next-line consistent-return
  handleCraft(event) {
    event.preventDefault();
    const craftRecipe = [...this.workList.children].find(
      item => item.classList[0] === 'recipe-item'
    );
    // проверка на рецепт на столе
    if (!craftRecipe) {
      // eslint-disable-next-line no-alert
      return alert('we need recipe to cook');
    }
    const craftIndgredientsList = [...craftRecipe.children]
      .slice(1, 4)
      .map(item => item.textContent)
      .filter(e => e)
      .map(element => `${element}-craft`);
    this.workListItems = Array.from(this.workList.childNodes).reduce(
      (acc, elem) => [...acc, elem.getAttribute('data-id')],
      []
    );
    // проверка на нужные ингредиенты
    if (
      !craftIndgredientsList
        .map(element => this.workListItems.includes(element))
        .every(elem => elem === true)
    ) {
      // eslint-disable-next-line no-alert
      return alert('need ingredients');
    }
    if (
      Array.from(this.ingredientList.children)
        .reduce((acc, elem) => [...acc, elem.getAttribute('data-id')], [])
        .includes(craftRecipe.children[0].innerText.toLowerCase())
    ) {
      // eslint-disable-next-line no-alert
      return alert(`${craftRecipe.children[0].innerText} already exist in igredient list`);
    }
    craftIndgredientsList.forEach(ingredient => {
      this.emit('removeItem', ingredient);
    });
    this.emit('removeItem', craftRecipe.getAttribute('data-id'));
    this.emit('addItem', [craftRecipe.children[0].innerText]);
  }
}

export default View;
