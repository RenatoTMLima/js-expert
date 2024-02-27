import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import Order from "../src/entities/order.js";
import OrderBusiness from "../src/business/orderBusiness.js";

describe("Test suite for Template Method design pattern", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  describe("Order business", () => {
    test("execution Order Business without Template Method", () => {
      const order = new Order({
        customerId: 123,
        amount: 100000,
        products: [{ description: "ferrari" }],
      });

      const orderBusiness = new OrderBusiness();
      // todos devs devem obrigatoriamente lembrar de seguir a risca esse fluxo de execucao.
      // se algum esquecer de chamar a funcao de validacao, pode quebrar todo o sistema
      const isValid = orderBusiness._validateRequiredFields(order);
      expect(isValid).toBeTruthy();

      const result = orderBusiness._create(order);
      expect(result).toBeTruthy();
    });
    test("execution Order Business with Template Method", () => {
      const order = new Order({
        customerId: 123,
        amount: 100000,
        products: [{ description: "ferrari" }],
      });

      const orderBusiness = new OrderBusiness();

      const calledValidationFn = jest.spyOn(
        orderBusiness,
        orderBusiness._validateRequiredFields.name
      );
      const calledCreateFn = jest.spyOn(
        orderBusiness,
        orderBusiness._create.name
      );

      // com template method, a sequencia  de passos eh sempre executada
      // evita a replicacao de logica
      const result = orderBusiness.create(order);
      expect(result).toBeTruthy();
      expect(calledValidationFn).toHaveBeenCalled();
      expect(calledCreateFn).toHaveBeenCalled();
    });
  });
});
