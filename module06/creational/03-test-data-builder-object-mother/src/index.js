/**
 * ProductId: should be between 2 and 20 characters
 * Name: should be only words
 * Price: should be from 0 to 1000
 * Category: should be electronic or organic
 */

function productValidator(product) {
  const errors = [];

  if (!(product.id.length >= 2 && product.id.length <= 20)) {
    errors.push(
      `id: invalid length, current [${product.id}] expected to be between 2 and 20`
    );
  }

  if (/(\W|\d)/.test(product.name)) {
    errors.push(
      `name: invalid value, current [${product.name}] expected to have only words`
    );
  }

  if (product.price > 1000 || product.price < 1) {
    errors.push(
      `price: invalid price, current [${product.price}] expected to be between 0 and 1000`
    );
  }

  if (product.category !== "organic" && product.category !== "electronic") {
    errors.push(
      `category: invalid value, current [${product.category}] expected to be either organic or electronic`
    );
  }

  return {
    result: errors.length === 0,
    errors,
  };
}

module.exports = { productValidator };
