const { deepStrictEqual, ok } = require("assert");

// Usado na maioria das vezes para listas de itens unicos

const arr1 = ["0", "1", "2"];
const arr2 = ["2", "0", "3"];
const arr3 = arr1.concat(arr2);

deepStrictEqual(arr3, ["0", "1", "2", "2", "0", "3"]);

const set = new Set();
arr1.map((item) => set.add(item));
arr2.map((item) => set.add(item));

deepStrictEqual([...set], ["0", "1", "2", "3"]);
deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ["0", "1", "2", "3"]);

console.log(set.keys(), set.values()); // ambos retornam a msm coisa, o map so existe para ter uma equivalencia com o Map

// No array comum para saber se um item existe
// [].indexOf(1) !== -1 ou [...].includes(item)

ok(set.has("3"));

/**
 * Mesma teoria do Map, mas vc sempre trabalha com a lista toda.
 * Nao tem get, entao vc pode saber se o item esta ou nao no array e eh isso.
 * Na documentacao tem exemplos sobre como fazer uma intercecao, saber o que tem
 * em uma lista e nao tem na outra e assim por diante
 */

// Tem nos 2 arrays
const users01 = new Set(["Joao", "Maria", "Jose"]);

const users02 = new Set(["Maria", "Luis", "Pedro"]);

const intersection = new Set([...users01].filter((user) => users02.has(user)));
deepStrictEqual([...intersection], ["Maria"]);

const difference = new Set([...users01].filter((user) => !users02.has(user)));
deepStrictEqual([...difference], ["Joao", "Jose"]);
