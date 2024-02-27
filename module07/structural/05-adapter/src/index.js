import RickAndMortyBRAdapter from "./business/adapters/rickAndMortyBRAdapter.js";
import RickAndMortyUSAdapter from "./business/adapters/rickAndMortyUSAdapter.js";

const data = [RickAndMortyBRAdapter, RickAndMortyUSAdapter].map((integration) =>
  integration.getCharacter()
);

const all = await Promise.allSettled(data);

const success = all
  .filter(({ status }) => status === "fulfilled")
  .map(({ value }) => value)
  .reduce((prev, next) => prev.concat(next), []);

console.table(success);
