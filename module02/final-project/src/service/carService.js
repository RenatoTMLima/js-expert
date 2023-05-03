const BaseRepository = require("../repository/base");
const Tax = require("../entities/tax");
const Transaction = require("../entities/transaction");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });

    this.taxBasedOnAge = Tax.taxesBasedOnAge;

    this.currencyFormat = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;
    return Math.floor(Math.random() * listLength);
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    const carId = carCategory.carIds[randomCarIndex];

    return carId;
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);

    return this.carRepository.find(carId);
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer;
    const { price } = carCategory;
    const { then: tax } = this.taxBasedOnAge.find(
      (tax) => age >= tax.from && age <= tax.to
    );

    return this.currencyFormat.format(price * tax * numberOfDays);
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory);

    const finalPrice = this.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    );

    const today = new Date();
    today.setDate(today.getDate() + numberOfDays);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dueDate = today.toLocaleDateString("pt-br", options);

    const transaction = new Transaction({
      amount: finalPrice,
      car,
      customer,
      dueDate,
    });

    return transaction;
  }
}

module.exports = CarService;
