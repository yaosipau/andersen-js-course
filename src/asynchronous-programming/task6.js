/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

export function getResolvedPromise(value) {
  return new Promise(resolve => {
    resolve(value);
  });
}
