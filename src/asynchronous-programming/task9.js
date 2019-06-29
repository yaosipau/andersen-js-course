/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

const asyncBar = async () => 'some string!';

export async function foo() {
  const f = await asyncBar();
  console.log(f);
}
