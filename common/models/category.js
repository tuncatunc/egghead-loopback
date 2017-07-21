'use strict';

module.exports = function(Category) {
  Category.observe('before delete', function(ctx, next){
    Category.app.models.Product
      .count({id: ctx.where.id})
      .then(res => {
        console.log(res);
        if (res > 1){
          return Promise.reject('Error deleting category with products');
        }
      })
      return next();
  })

  Category.validatesUniquenessOf('name');
};
