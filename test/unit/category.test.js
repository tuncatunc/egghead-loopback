const {
  app,
  expect
} = require('../common');

// Get a reference to the Product model
const Category = app.models.Category;

describe('Category', function () {
  describe('Hooks', function () {
    it('should reject to delete Category with Products', function () {
        Category.create({name: 'My category'})
        .then((cat) => {Product.create({name: 'My Product', price: 123, categoryId: cat.id})})
        .then((product) => { Category.destroyById(product.categoryId)})
        .then(res => expect(res).to.be.null())
        .catch((err)=> expect(err).to.contain('Error deleting category with products'))
    })
  })

  describe('Validation', function(){
    it('should reject add duplicate categories', function(){
        Category.create({name: 'Duplicate'})
          .then(c => Category.create(c))
          .then(c => expect(true).to.be(false))
          .catch(err => expect(err).to.not.be.null);
    })
  })
})
