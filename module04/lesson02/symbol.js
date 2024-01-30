const assert = require("assert");

// ----- keys
const uniqueKey = Symbol("userName");
const user = {};

user["userName"] = "value for normal objects";
user[uniqueKey] = "value for symbol";

// console.log("getting normal object", user.userName);
// // Sempre unico em nivel de endereco de memoria
// console.log("getting symbol object", user[Symbol("userName")]);
// console.log("getting symbol object", user[uniqueKey]);

assert.deepStrictEqual(user.userName, "value for normal objects");

// Sempre unico em nivel de endereco de memoria
assert.deepStrictEqual(user[Symbol("userName")], undefined);

assert.deepStrictEqual(user[uniqueKey], "value for symbol");

// eh dificil de acessar mas nao eh secreto!
// console.log("symbols", Object.getOwnPropertySymbols(user));
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// Well known symbols
const obj = {
  // iterators
  [Symbol.iterator]: () => ({
    items: ["c", "b", "a"],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop(),
      };
    },
  }),
};

// for (const item of obj) {
//   console.log("item", item);
// }

assert.deepStrictEqual([...obj], ["a", "b", "c"]);

const kItems = Symbol("kItems");
class MyDate {
  constructor(...args) {
    this[kItems] = args.map((arg) => new Date(...arg));
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== "string") throw new TypeError();

    const items = this[kItems].map((item) =>
      new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(item)
    );

    return new Intl.ListFormat("pt-BR", {
      style: "long",
      type: "conjunction",
    }).format(items);
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = (ms) => new Promise((r) => setTimeout(r, ms));
    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }

  get [Symbol.toStringTag]() {
    return "WHAT";
  }
}

const myDate = new MyDate([2020, 1, 2], [2020, 2, 2]);

const expectedDates = [new Date(2020, 1, 2), new Date(2020, 2, 2)];

assert.deepStrictEqual(Object.prototype.toString.call(myDate), "[object WHAT]");
assert.throws(() => myDate + 1);
assert.deepStrictEqual(
  String(myDate),
  "02 de fevereiro de 2020 e 02 de março de 2020"
);
assert.deepStrictEqual([...myDate], expectedDates);

(async () => {
  const dates = await Promise.all([...myDate]);
  assert.deepStrictEqual(dates, expectedDates);
})();
