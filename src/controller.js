class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('addItem', this.addItem.bind(this));
    view.on('removeItem', this.removeItem.bind(this));
  }

  addItem(title) {
    const item = this.model.addItem({
      title,
    });
    this.view.addItem(item);
  }

  removeItem(id) {
    this.model.removeItem(id);
    this.view.removeItem(id);
  }
}

export default Controller;
