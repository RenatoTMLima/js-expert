import RickAndMortyUS from "../integrations/rickAndMortyUS.js";

export default class RickAndMortyUSAdapter {
  static async getCharacter() {
    return RickAndMortyUS.getCharactersFromXML();
  }
}
