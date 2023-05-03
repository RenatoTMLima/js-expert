const { describe, it, before, after } = require("mocha");
const supertest = require("supertest");
const assert = require("assert");

describe("API suite test", () => {
  let app;

  before((done) => {
    app = require("./api");
    app.once("listening", done);
  });

  after((done) => app.close(done));

  describe("/contact:get", () => {
    it("should request the contact route and return HTTP Status 200", async () => {
      const response = await supertest(app).get("/contact").expect(200);

      assert.strictEqual(response.text, "Contact us page");
    });
  });
  describe("/login:post", () => {
    it("should request the login route and return HTTP Status 200", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "renato takao", password: "123" })
        .expect(200);

      assert.strictEqual(response.text, "Login succeeded!");
    });
    it("should request the login route with wrong credentials and return HTTP Status 401", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "renato takao", password: "1234" })
        .expect(401);

      assert.strictEqual(response.text, "Login failed");
    });
  });
  describe("default", () => {
    it("should request a non existent route and return HTTP Status 404", async () => {
      const response = await supertest(app).get("/non-existent").expect(404);

      assert.strictEqual(response.text, "Not found");
    });
  });
});
