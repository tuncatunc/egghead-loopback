'use strict';
var fs = require('fs')

module.exports = function (Product) {

  Product.observe('before save', function(ctx, next){
    if (ctx.instance && ctx.instance.categoryId){
      return Product.app.models.Category
        .count({id: ctx.instance.categoryId})
        .then(res => {
          if (res < 1 ){
            return Promise.reject('Error adding product to non-existing category')
          }
        })

    }

    return next();
  })
  /**
   * Purchase a product
   * @param {number} quantity Number of products to buy
   * @param {Function(Error, object)} callback
   */

  Product.prototype.buy = function (quantity, callback) {
    var invalidQuantity = quantity <= 0;

    if (invalidQuantity){
      return callback(`Invalid quantity ${quantity}`);
    }

    var result = {
      quantity,
      status: `You bought ${quantity} product(s)`
    };
    // TODO
    callback(null, result);
  };

  // Validate name length
  Product.validatesLengthOf('name', {
    min: 3,
    message: {
      min: "Name should be at least 3 chars"
    }
  })

  // Validate product name is unique
  Product.validatesUniquenessOf('name');

  const positiveInteger = /^[0-9]*$/
  
  const validatePositiveInteger = function (err) {
    if (!positiveInteger.test(this.price)){
      err();
    }
  }

  Product.validate('price', validatePositiveInteger, {
    message: 'Price should be a positive integer'
  })

  const validateMinimalPrice = function (err, done) {
    const price = this.price;
    process.nextTick(() => {
      const minimalPriceFromDB = 90;
      if (price < minimalPriceFromDB){
        err();
      }
      done();
    })
  }

  Product.validateAsync('price', validateMinimalPrice, {
    message: 'Price should be higher than the minimal price in DB'
  })
};
