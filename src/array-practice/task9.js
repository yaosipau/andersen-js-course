/**
 * Реализовать функцию indexOfAll в этом файле, и экспортировать ее.
 *
 * Первый аргумент - массив, второй - значение
 *
 * Функция возвращает массив со всеми индексами, которые соответствуют переданному значению
 * ([1, 2, 3, 1, 2, 3], 1) -> 1ца в массиве присутствует на 0ой и 3ей позиции. Вернули [0, 3]
 * ([1, 2, 3], 4) -> 4ка в массиве НЕ присутствует. Вернули пустой массив []
 *
 * console.log(indexOfAll([1, 2, 3, 1, 2, 3], 1)); -> [0, 3]
 * console.log(indexOfAll([1, 2, 3], 4)); -> []
 */

export function indexOfAll(array, elem) {
	let newArray = [];
	let index = array.indexOf(elem);
	while (index != -1) {
		newArray.push(index);
		index = array.indexOf(elem, index + 1);
	}
	return newArray;
}
