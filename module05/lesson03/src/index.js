"use strict";

const { readFile } = require("fs/promises");
const { join } = require("path");
const pdf = require("pdf-parse");

(async () => {
  const databuffer = await readFile(join(__dirname, "./../../contrato.pdf"));

  const data = await pdf(databuffer);

  console.log(data.text);
})();

const regex = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*)$/gim;
