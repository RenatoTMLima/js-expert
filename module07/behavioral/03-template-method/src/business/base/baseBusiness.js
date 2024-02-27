import { NotImplementedException } from "../../util/exceptions.js";

export default class BaseBusiness {
  _validateRequiredFields(data) {
    throw new NotImplementedException(this._validateRequiredFields.name);
  }

  _create(data) {
    throw new NotImplementedException(this._create.name);
  }

  /**
   * Padrao do Martin Fowler
   * a proposta do padrao eh garantir um fluxo de metodos, definindo
   * uma sequencia a ser executada.
   *
   * esse create eh a implementacao efetiva do Template Method
   */
  create(data) {
    const isValid = this._validateRequiredFields(data);

    if (!isValid) throw new Error("invalid data!");

    return this._create(data);
  }
}
