/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
const urls = [
  'http://www.json-generator.com/api/json/get/cevhxOsZnS',
  'http://www.json-generator.com/api/json/get/cguaPsRxAi',
  'http://www.json-generator.com/api/json/get/cfDZdmxnDm',
  'http://www.json-generator.com/api/json/get/cfkrfOjrfS',
  'http://www.json-generator.com/api/json/get/ceQMMKpidK',
];

export function getDataSequence() {
  const arr = [];
  urls.reduce(
    (acc, url) => acc.then(fetch(url).then(res => res.json().then(data => arr.push(data)))),
    Promise.resolve()
  );
  console.log(arr);
}
export function getDataParallel() {
  Promise.all(urls.map(url => fetch(url)))
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(list => console.log(list));
}
