/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

const getPromise1 = () => Promise.resolve(2);
const getPromise2 = () => Promise.resolve(3);
const getPromise3 = () => Promise.resolve(7);

export function foo() {
  let value1;
  let value2;
  let value3;

  getPromise1()
    .then(value => {
      value1 = value;
      return getPromise2();
    })
    .then(value => {
      value2 = value;
      return getPromise3();
    })
    .then(value3 => {
      console.log(value1 * (value2 + value3));
    });
}

export async function myFoo() {
  const value1 = await getPromise1();
  const value2 = await getPromise2();
  const value3 = await getPromise3();
  console.log(value1 * (value2 + value3));
}
