/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
const SERVER_URL = 'http://localhost:3000/users';
const PLACEHOLDERS = ['firstname', 'lastname', 'age', 'e-mail'];
const TYPES = ['text', 'text', 'number', 'email'];

function postRequest(url, data) {
  return fetch(url, {
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
}
function putRequest(url, data) {
  return fetch(url, {
    credentials: 'same-origin',
    method: 'PUT',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
}
function createNode(element) {
  return document.createElement(element);
}
function append(parent, element) {
  return parent.appendChild(element);
}
function update(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}
function myInputs(form, placeholders, types) {
  for (let i = 0; i < 4; i += 1) {
    const input = createNode('input');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('type', types[i]);
    input.setAttribute('placeholder', placeholders[i]);
    input.setAttribute('id', placeholders[i]);
    if (i === 2) {
      input.setAttribute('min', 5);
      input.setAttribute('max', 90);
    }
    append(form, input);
  }
}
function createInput() {
  const form = createNode('form');
  const addButton = createNode('button');
  addButton.innerText = 'add';
  addButton.setAttribute('id', 'add');
  addButton.addEventListener('click', addNewData);
  myInputs(form, PLACEHOLDERS, TYPES);
  append(form, addButton);
  return form;
}
function createListItem(user) {
  const li = createNode('li');
  const span = createNode('span');
  const edit = createNode('button');
  const remove = createNode('button');
  li.setAttribute('data-id', user._id);
  span.innerHTML = `${user.firstname} ${user.lastname} ${user.age} ${user.mail}`;
  edit.innerText = 'edit';
  edit.addEventListener('click', editData);
  remove.innerText = 'delete';
  remove.addEventListener('click', removeData);
  append(li, span);
  append(li, edit);
  append(li, remove);
  return li;
}
function editData(e) {
  e.preventDefault();
  const form = createNode('form');
  const edit = createNode('button');
  const li = e.target.parentNode;
  const data = li.removeChild(e.target.previousSibling).innerText.split(' ');
  e.target.nextSibling.remove();
  e.target.remove();
  edit.innerText = 'save';
  edit.addEventListener('click', saveData);
  myInputs(form, data, TYPES);
  append(li, form);
  append(li, edit);
}
async function saveData(e) {
  e.preventDefault();
  const li = e.target.parentNode;
  const id = li.getAttribute('data-id');
  const newData = {
    firstname: li.getElementsByTagName('input')[0].value,
    lastname: li.getElementsByTagName('input')[1].value,
    age: Number(li.getElementsByTagName('input')[2].value),
    mail: li.getElementsByTagName('input')[3].value,
  };
  await putRequest(`${SERVER_URL}/${id}`, newData).catch(error => console.log(error));
  await getData();
}
async function removeData(e) {
  e.preventDefault();
  const id = e.target.parentNode.getAttribute('data-id');
  await fetch(`${SERVER_URL}/${id}`, {
    method: 'DELETE',
  });
  await getData();
}
async function addNewData(e) {
  e.preventDefault();
  const data = {
    firstname: document.getElementById('firstname').value,
    lastname: document.getElementById('lastname').value,
    age: Number(document.getElementById('age').value),
    mail: document.getElementById('e-mail').value,
  };
  await postRequest(SERVER_URL, data).catch(error => console.log(error));
  await getData();
}
async function getData() {
  const ul = document.getElementById('users');
  update(ul);
  await fetch(SERVER_URL)
    .then(response => response.json())
    .then(data => {
      data.map(user => append(ul, createListItem(user)));
    })
    .catch(error => console.log(error));
  await append(ul, createInput());
}

export { getData };
