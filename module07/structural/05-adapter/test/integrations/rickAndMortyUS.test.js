import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import fs from "fs/promises";
import Character from "../../src/entities/character.js";
import RickAndMortyUS from "../../src/business/integrations/rickAndMortyUS.js";
import axios from "axios";

describe("#RickAndMortyUS", () => {
  beforeEach(() => jest.clearAllMocks());

  test("#getCharactersFromXML should return a list of character entity", async () => {
    const response = await fs.readFile("./test/mocks/characters.xml");

    const expected = [
      {
        gender: "Male",
        id: 10,
        location: "Worldender's lair",
        name: "Alan Rails",
        origin: "unknown",
        species: "Human",
        status: "Dead",
        type: "Superhuman (Ghost trains summoner)",
      },
    ];

    jest.spyOn(axios, "get").mockResolvedValue({ data: response });

    const result = await RickAndMortyUS.getCharactersFromXML();
    expect(result).toMatchObject(expected);
  });
  test("#getCharactersFromXML should return an empty list if the API returns nothing", async () => {
    const response = await fs.readFile("./test/mocks/characters-empty.xml");

    const expected = [];

    jest.spyOn(axios, "get").mockResolvedValue({ data: response });

    const result = await RickAndMortyUS.getCharactersFromXML();
    expect(result).toStrictEqual(expected);
  });
});
