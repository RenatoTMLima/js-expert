import ContextStrategy from "./src/base/contextStrategy.js";
import MongodbStrategy from "./src/strategies/mongodbStrategy.js";
import PostgresStrategy from "./src/strategies/postgresStrategy.js";

const postgresConnectionString =
  "postgres://renato:admin123@localhost:5432/heroes";

const postgresContext = new ContextStrategy(
  new PostgresStrategy(postgresConnectionString)
);
await postgresContext.connect();

const mongoDBConnectionString =
  "mongodb://renato:admin123@localhost:27017/heroes";
const mongodbContext = new ContextStrategy(
  new MongodbStrategy(mongoDBConnectionString)
);

await mongodbContext.connect();

const data = [
  {
    name: "renato",
    type: "transaction",
  },
  {
    name: "erick",
    type: "activityLog",
  },
];

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongodbContext,
};

for (const { name, type } of data) {
  const context = contextTypes[type];
  await context.create({ name: name + Date.now() });

  console.log(type, context.dbStrategy.constructor.name);
  console.log(await context.read());
}

// await postgresContext.create({ name: data[0].name });
// console.log(await postgresContext.read());

// await mongodbContext.create({ name: data[1].name });
// console.log(await mongodbContext.read());
