import RickAndMortyBR from "../integrations/rickAndMortyBR.js";

export default class RickAndMortyBRAdapter {
  static async getCharacter() {
    return RickAndMortyBR.getCharactersFromJSON();
  }
}
