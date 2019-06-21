import './styles/main.css';
import Model from './model';
import View from './view';
import Controller from './controller';

const model = new Model();
const view = new View();
// eslint-disable-next-line no-unused-vars
const controller = new Controller(model, view);
