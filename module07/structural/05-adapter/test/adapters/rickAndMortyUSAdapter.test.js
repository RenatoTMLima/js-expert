import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import RickAndMortyUSAdapter from "../../src/business/adapters/rickAndMortyUSAdapter.js";
import RickAndMortyUS from "../../src/business/integrations/rickAndMortyUS.js";

describe("#RickAndMortyUSAdapter", () => {
  beforeEach(() => jest.clearAllMocks());

  test("#getCharacters should be an adapter for RickAndMortyUS", async () => {
    const usIntegration = jest
      .spyOn(RickAndMortyUS, RickAndMortyUS.getCharactersFromXML.name)
      .mockReturnValue([]);

    const result = await RickAndMortyUSAdapter.getCharacter();

    expect(result).toEqual([]);
    expect(usIntegration).toHaveBeenCalled();
  });
});
