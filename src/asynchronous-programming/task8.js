/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

const getUsers = url => fetch(url);

export function foo(url) {
  getUsers(url)
    .then(response => response.json())
    .then(([user]) => console.log(user))
    .catch(err => console.log('Error!', err));
}

export async function myFoo(url) {
  try {
    const response = await getUsers(url);
    const data = await response.json();
    console.log(data[0]);
  } catch (err) {
    console.log('Error!', err);
  }
}
