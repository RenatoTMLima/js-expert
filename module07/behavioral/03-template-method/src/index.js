import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
  customerId: 144,
  amount: 200000,
  products: [{ description: "shampoo" }],
});

const orderBusiness = new OrderBusiness(order);
console.info("orderCreated", orderBusiness.create(order));
