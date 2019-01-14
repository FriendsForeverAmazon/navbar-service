const faker = require('faker');
const _ = require('underscore');

const { Category } = require('../models/category.model.js');
const { Product } = require('../models/product.model.js');

const categoryPromises = 
  ['electronics', 'clothes', 'games', 'appliances', 'books']
    .map(category => Category.create({ category }));

Promise.all(categoryPromises)
  .then(categories => {
    let productName, productDescription;
    Product.insertMany(
      _.flatten(
        categories.map(category => {
          let productArray = [];
          for(let i = 0; i < 200; i++) {
            productName = faker.commerce.productName();
            productDescription = faker.lorem.paragraph();
            productArray.push({
              name: productName.toLowerCase(),
              description: productDescription,
              categoryId: category.id
            })
          }
          return productArray;
        })
      )
    )
    .then(products => {
      console.log(`Created ${products.length} products.`)
    })
    .catch(err => console.log('Error: Products', err))
  })
  .catch(err => console.log('Error: Categories', err));