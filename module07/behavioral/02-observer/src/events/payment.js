export default class Payment {
  constructor(paymentSubject) {
    this.paymentSubject = paymentSubject;
  }

  creditCard(paymentData) {
    console.log(`\na payment was performed from ${paymentData.userName}`);

    this.paymentSubject.notify(paymentData);
  }
}
