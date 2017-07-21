const  { app, expect} = require('../common');

// Get a reference to the Product model
const Product = app.models.Product;

describe('Product', function(){
  describe('It should resolve', function(){
    it('a Product.find', function(){
      return Promise.resolve()
        .then(() => Product.find())
        .then(res => expect(res).to.be.an('array'))
        .catch(err => expect(false).to.be(true));
    })
  })

  describe('Custom methods', function(){
    it('should allow buying a product', function(){
      const product = new Product({name:'buy-product', price: 299});
      product.buy(10, function(err, res){
        expect(res.status).to.contain('You bought 10 product(s)')
      })
    })

    it('should disallow negative quantity', function(){
      const product = new Product({name: 'buy-product', price: 123});
      return product.buy(-1, function(err, res){
        expect(err).to.contain('Invalid quantity -1');
      })
    })
  })

  describe('Validation', function(){
    it('should reject a name <3  characters', function(){
      Product.create({name: 'ab', price: 100})
        .then(res => Promise.reject('Product should not be created'))
        .catch(err => {
          expect(err.message).to.contain('Name should be at least 3 chars');
          expect(err.statusCode).to.be.equal(422);
        });
    })

    it ('should reject a price less than minimum price', function(){
      Product.create({name: 'minimum price', price: -1})
        .then(res => Promise.reject('Product should not be created'))
        .catch(err => {
          expect(err.message).to.contain('Price should be higher than the minimal price in DB');
          expect(err.statusCode).to.be.equal(422)
        })
    })

    it ('should reject duplicate name', function() {
      Product.create({name: 'duplicate', price: 100})
        .then(() => { Product.create({name: 'duplicate', price: 100})})
        .then(() => Promise.reject('Product should not be created'))
        .catch((err) => {
          expect(err.message).to.contain('is not unique');
          expect(err.statusCode).to.be.eq(422);
        })
    })
  })

  describe('Hooks', function(){
    it ('should reject to add Product non existing Category', function(){
      Promise.resolve()
        .then(() => Product.create({name: 'A Product', price: 100, categoryId: 999}))
        .then(() => Promise.reject('Product should not be created'))
        .catch((err) => expect(err).to.contain('Error adding product to non-existing category'))
    })
  })
})
