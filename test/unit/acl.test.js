const { app, expect, request} = require('../common')

const Category = app.models.Category;
const Product = app.models.Product;

console.log('NODE_ENV', process.env.NODE_ENV)

describe('ACL', function(){
  describe('Unauthorized access', function(){
    describe('Product', function(){
      it('should return 200 when buying Product', function(){
          return Promise.resolve()
            .then(() => Product.create({name: 'Buy Product', price: 123}))
            .then((product) => request.post(`/api/Products/${product.id}/buy`).send({quantity: 100}).expect(200))
          
      })

      it('should return 401 when creating Product', function(){
          request.post('/api/Products/').send({name: 'Unauthorized produc', price: 123}).expect(401);
      })

      it('should return 401 when update Product', function(){
          request.patch('/api/Products/').send({id: 1, name: 'Unauthorized produc', price: 123}).expect(401);
      })

      it('should return 401 when delete Product', function(){
          request.delete('/api/Products/').send({id: 1}).expect(401);
      })
    })

    describe('Category', function(){
      it('should return 401 when creating Category', function(){
          request.post('/api/Categories/').send({name: 'Unauthorized category', price: 123}).expect(401);
      })

      it('should return 401 when update Category', function(){
          request.patch('/api/Categories/').send({id: 1, name: 'Unauthorized category', price: 123}).expect(401);
      })

      it('should return 401 when delete Category', function(){
          request.delete('/api/Categories/').send({id: 1}).expect(401);
      })
    })
  })
})