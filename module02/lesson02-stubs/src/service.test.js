const Service = require("./service");
const assert = require("assert");
const BASE_URL = "https://swapi.dev/api/planets/";
const { createSandbox } = require("sinon");
const sinon = createSandbox();
const mocks = {
  tatooine: require("../mocks/tatooine.json"),
  alderaan: require("../mocks/alderaan.json"),
};

(async () => {
  // Esse teste acessa a internet!!!
  // {
  //   const service = new Service();
  //   const dados = await service.makeRequest(`${BASE_URL}2`);
  //   console.log(JSON.stringify(dados));
  // }

  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);

  stub.withArgs(`${BASE_URL}1`).resolves(mocks.tatooine);

  stub.withArgs(`${BASE_URL}2`).resolves(mocks.alderaan);

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearedIn: 5,
    };
    const results = await service.getPlanets(`${BASE_URL}1`);
    assert.deepStrictEqual(results, expected);
  }

  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearedIn: 2,
    };
    const results = await service.getPlanets(`${BASE_URL}2`);
    assert.deepStrictEqual(results, expected);
  }
})();
