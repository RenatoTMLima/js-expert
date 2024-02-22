"use strict";

const { TextProcessorFacade } = require("./textProcessorFacade");
const { readFile } = require("fs/promises");
const { join } = require("path");
const pdf = require("pdf-parse");

(async () => {
  const databuffer = await readFile(join(__dirname, "./../../contrato.pdf"));

  const data = await pdf(databuffer);

  const instance = new TextProcessorFacade(data.text);
  const people = instance.getPeopleFromPDF();
  console.log({ people });
})();

const regex = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*)$/gim;
