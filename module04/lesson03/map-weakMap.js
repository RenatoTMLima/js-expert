const { deepStrictEqual, ok, throws } = require("assert");

const myMap = new Map();

// pode usar qualquer coisa como chave
myMap.set(1, "one");
myMap.set("takao", { name: "takao" });
myMap.set(true, () => "hello");

// usando um construtor
const myMapConstructor = new Map([
  ["1", "str1"],
  [1, "num1"],
  [true, "bool1"],
]);

deepStrictEqual(myMap.get(1), "one");
deepStrictEqual(myMap.get("takao"), { name: "takao" });
deepStrictEqual(myMap.get(true)(), "hello");

// Em objects a chave so pode ser string ou symbol (number eh coergido a string)
const onlyReferenceWorks = { value: 1 };
myMap.set(onlyReferenceWorks, { name: "takao" });

deepStrictEqual(myMap.get({ value: 1 }), undefined);
deepStrictEqual(myMap.get(onlyReferenceWorks), { name: "takao" });

// utilitarios
// No object seria Object.keys(obj).length
deepStrictEqual(myMap.size, 4);

// para verificar se um item existe no objeto
// item.key => se nao existe = undefined
// if() = coercao implicita para boolean e retorna false
// jeito mais correto: obj.hasOwnProperty('prop')
ok(myMap.has(onlyReferenceWorks));

// Para remover item do objeto
// delete item.prop
// imperformatico para o JS
ok(myMap.delete(onlyReferenceWorks));

// Nao tem como iterar sobre um objeto diretamente
// teria que fazer Object.entries(...)
deepStrictEqual(
  JSON.stringify([...myMap]),
  `[[1,"one"],["takao",{"name":"takao"}],[true,null]]`
);

for (const [key, value] of myMap) {
  console.log(key, value);
}

// O object eh inseguro pois dependendo do nome da chave, pode substituir algum comportamento padrao
// ({}).toString() === "[object Object]"
// ({ toString: () => "Hey" }).toString() === 'Hey

// Qualquer chave pode colidir, com as propriedades herdadas do objeto, como
// constructor, toString, valueOf, etc...

const actor = {
  name: "Xuxa da Silva",
  toString: "Queen: Xuxa da Silva",
};

// Nao tem restricao de chave
myMap.set(actor);

ok(myMap.has(actor));
throws(() => myMap.get(actor).toString, TypeError);

// Nao da para limpar um object sem reassina-lo
myMap.clear();
deepStrictEqual([...myMap.keys()], []);

// ------ WEAKMAP
// Pode ser coletado apos perder as referencias
// usado em casos beeeeem especificos

// Tem a maioria dos beneficios do Map
// MAS: nao eh iteravel
// So chaves de referencia e que vc conheca
// mais leve e preve memory leak, pq depois que as instancias saem da memoria, tudo eh limpo
const weakMap = new WeakMap();
const hero = { name: "flash" };

// weakMap.set(hero)
// weakMap.has(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
