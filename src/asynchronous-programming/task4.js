/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

export function getData() {
  return fetch('http://www.json-generator.com/api/json/get/cfQCylRjuG')
    .then(response => response.json())
    .then(myBool => {
      if (myBool.getUsersData) {
        fetch('http://www.json-generator.com/api/json/get/cfVGucaXPC')
          .then(response => response.json())
          .then(myData => console.log(myData));
      }
    });
}
