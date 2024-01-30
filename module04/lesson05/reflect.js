"use strict";

const assert = require("assert");

// garantir semantica e seguranca em objetos

// --- apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  },
};

// Um problema que pode acontecer
// Function.prototype.apply = () => {
//   throw new TypeError("Eita!");
// };

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// esse aqui pode acontecer!
myObj.add.apply = function () {
  throw new TypeError("Vixx");
};

assert.throws(() => myObj.add.apply({}, []), {
  name: "TypeError",
  message: "Vixx",
});

// usando reflect
const result = Reflect.apply(myObj.add, { arg1: 20, arg2: 40 }, [200]);
assert.deepStrictEqual(result, 260);

// define property
// questoes semanticas

function MyDate() {}

// feio pra cacete, tudo eh object, mas object adicionando prop para uma function?
Object.defineProperty(MyDate, "withObject", { value: () => "Hey there!" });

// agora faz mais sentido
Reflect.defineProperty(MyDate, "withReflect", { value: () => "Hey dude!" });

assert.deepStrictEqual(MyDate.withObject(), "Hey there!");
assert.deepStrictEqual(MyDate.withReflect(), "Hey dude!");

// delete property

const withDelete = { user: "Renato" };
// imperformatico, evitar ao maximo
delete withDelete.user;

assert.deepStrictEqual(withDelete.hasOwnProperty("user"), false);

const withReflect = { user: "Takao" };
Reflect.deleteProperty(withReflect, "user");

assert.deepStrictEqual(withReflect.hasOwnProperty("user"), false);

// ----- get

// deveriamos fazer um get somente em instancias de referencia
assert.deepStrictEqual((1)["user"], undefined);

// com reflect uma excecao eh lancada
assert.throws(() => Reflect.get(1, "user"), TypeError);

// ---- has
assert.ok("superman" in { superman: "" });
assert.ok(Reflect.has({ batman: "" }, "batman"));

// ---- ownKeys

const user = Symbol("user");
const dbUser = {
  id: 1,
  [Symbol.for("password")]: 123,
  [user]: 777,
};

// com os metodos de object, temos que fazer 2 requisicoes
const objKeys = [
  ...Object.getOwnPropertyNames(dbUser),
  ...Object.getOwnPropertySymbols(dbUser),
];

assert.deepStrictEqual(objKeys, ["id", Symbol.for("password"), user]);

const reflectKeys = Reflect.ownKeys(dbUser);

assert.deepStrictEqual(reflectKeys, ["id", Symbol.for("password"), user]);
