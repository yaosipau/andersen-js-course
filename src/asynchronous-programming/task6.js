/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

export function getResolvedPromise(value) {
  return new Promise(resolve => {
    resolve(value);
  })
    .then(result => {
      if (result > 300) {
        throw new Error('Ошибка');
      }
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => console.log('this is finally!'));
}
