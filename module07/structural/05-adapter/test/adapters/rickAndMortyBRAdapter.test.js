import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import RickAndMortyBRAdapter from "../../src/business/adapters/rickAndMortyBRAdapter.js";
import RickAndMortyBR from "../../src/business/integrations/rickAndMortyBR.js";

describe("#RickAndMortyBRAdapter", () => {
  beforeEach(() => jest.clearAllMocks());

  test("#getCharacters should be an adapter for RickAndMortyBR", async () => {
    const brIntegration = jest
      .spyOn(RickAndMortyBR, RickAndMortyBR.getCharactersFromJSON.name)
      .mockReturnValue([]);

    const result = await RickAndMortyBRAdapter.getCharacter();

    expect(result).toEqual([]);
    expect(brIntegration).toHaveBeenCalled();
  });
});
