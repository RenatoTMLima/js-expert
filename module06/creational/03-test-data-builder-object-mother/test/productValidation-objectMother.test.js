const { expect } = require("chai");
const { describe, it } = require("mocha");
const { productValidator } = require("../src");
const ProductObjectMother = require("./model/productObjectMother");

describe("Test Object Mother", () => {
  it("shouldn't return error with valid product", () => {
    const product = ProductObjectMother.valid();
    const result = productValidator(product);

    const expected = {
      errors: [],
      result: true,
    };

    expect(result).to.be.deep.equal(expected);
  });

  describe("Product Validation Rules", () => {
    it("should return an object error when creating a Product with invalid id", () => {
      const product = ProductObjectMother.withInvalidId();
      const result = productValidator(product);

      const expected = {
        errors: [
          "id: invalid length, current [1] expected to be between 2 and 20",
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
    it("should return an object error when creating a Product with invalid name", () => {
      const product = ProductObjectMother.withInvalidName();
      const result = productValidator(product);

      const expected = {
        errors: [
          "name: invalid value, current [abc123] expected to have only words",
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
    it("should return an object error when creating a Product with invalid price", () => {
      const product = ProductObjectMother.withInvalidPrice();
      const result = productValidator(product);

      const expected = {
        errors: [
          "price: invalid price, current [5000] expected to be between 0 and 1000",
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
    it("should return an object error when creating a Product with invalid category", () => {
      const product = ProductObjectMother.withInvalidCategory();
      const result = productValidator(product);

      const expected = {
        errors: [
          "category: invalid value, current [random] expected to be either organic or electronic",
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
  });
});
