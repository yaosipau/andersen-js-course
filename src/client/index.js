/* eslint-disable no-console */
import '../styles/main.css';

import { getData } from './functions';

const getButton = document.getElementById('getList');
getButton.addEventListener('click', getData);
