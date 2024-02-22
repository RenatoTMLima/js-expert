const { evaluateRegex } = require("./util");

class Person {
  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    cidade,
  ]) {
    const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g);

    const formatFirstLetter = (prop) =>
      prop.replace(
        firstLetterExp,
        (fullMatch, group1, group2, index) =>
          `${group1.toUpperCase()}${group2.toLowerCase()}`
      );

    this.nome = nome;
    this.nacionalidade = formatFirstLetter(nacionalidade);
    this.estadoCivil = formatFirstLetter(estadoCivil);
    this.documento = documento.replace(evaluateRegex(/\D/g), "");
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join();
    this.numero = numero;
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join();
    this.cidade = cidade.replace(evaluateRegex(/\.$/), "");
  }
}

module.exports = { Person };
