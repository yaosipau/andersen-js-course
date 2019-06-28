/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

export function parseJSON(jsonStr, successCb, failureCb) {
  try {
    const result = JSON.parse(jsonStr);
    successCb(result);
  } catch (error) {
    failureCb(error);
  }
}
export function successCb(result) {
  console.log('success parse!');
  console.log(result);
}
export function failureCb(error) {
  console.log('failure parse!');
  console.log(error);
}
