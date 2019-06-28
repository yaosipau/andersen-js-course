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
  const array = [];
  urls.reduce(
    (arr, url) => [
      ...arr,
      fetch(url)
        .then(response => response.json())
        .then(data => array.push(data)),
    ],
    []
  );
  return console.log(array);
}

export function getDataParallel() {
  Promise.all(urls.map(url => fetch(url)))
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(myData => myData.reduce((arr, elem) => [...arr, elem], []))
    .then(list => console.log(list));
}
