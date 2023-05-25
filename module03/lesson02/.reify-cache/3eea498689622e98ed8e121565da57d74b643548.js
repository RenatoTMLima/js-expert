"use strict";var describe,it;module.link("mocha",{describe(v){describe=v},it(v){it=v}},0);var expect;module.link("chai",{expect(v){expect=v}},1);var Person;module.link("../src/person.js",{default(v){Person=v}},2);



describe("Person", () => {
  it("should return a person instance from a string", () => {
    const person = Person.generateInstanceFromString(
      "1 Bike,Carro 2000 2020-01-01 2020-02-01"
    );
    const expected = {
      from: "2020-01-01",
      to: "2020-02-01",
      vehicles: ["Bike", "Carro"],
      id: "1",
      kmTraveled: "2000",
    };

    expect(person).to.be.deep.equal(expected);
  });

  it("should format values", () => {
    const person = new Person({
      from: "2020-01-01",
      to: "2020-02-01",
      vehicles: ["Bike", "Carro"],
      id: "1",
      kmTraveled: "2000",
    });
    const result = person.formatted("pt-BR");
    const expected = {
      from: "01 de janeiro de 2020",
      to: "01 de fevereiro de 2020",
      vehicles: "Bike e Carro",
      id: 1,
      kmTraveled: "2.000 km",
    };

    expect(result).to.be.deep.equal(expected);
  });
});
