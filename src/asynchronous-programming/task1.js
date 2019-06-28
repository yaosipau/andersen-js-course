/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
export function foo(x, cb) {
  if (x > 10) {
    console.log('x > 10');
    cb();
  } else {
    console.log('x <= 10');
  }
}

export function createCb(str) {
  return () => console.log(str);
}
