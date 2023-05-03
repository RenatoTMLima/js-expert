const File = require("./src/file");
const { error } = require("./src/constants");
const assert = require("assert");

(async () => {
  // Variáveis criadas dentro desse bloco só são válidas durante sua execução
  {
    const filePath = "./mock/emptyFile-invalid.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mock/invalid-header.csv";
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mock/fiveItems-invalid.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mock/valid.csv";
    const expected = [
      {
        id: 1,
        name: "joao silva",
        profession: "developer",
        age: 25,
      },
      {
        id: 2,
        name: "jose silva",
        profession: "quality assurance",
        age: 26,
      },
      {
        id: 3,
        name: "maria silva",
        profession: "project manager",
        age: 30,
      },
    ];
    const result = await File.csvToJson(filePath);
    assert.deepEqual(result, expected);
  }
})();
