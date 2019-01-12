var faker = require('faker');
var fs = require('fs');

const categoryStream = fs.createWriteStream('category.data.csv');
const productStream = fs.createWriteStream('product.data.csv');
const categoryNames = ['electronics', 'clothes', 'games', 'appliances', 'books'];

const write = (stream, data) => {
  if(!stream.write(data)){
    return new Promise(resolve => stream.once('drain', resolve));
  }
  return true;
}

const categories = categoryNames.map(category => { 
  let out = `${category},''\n`;
  categoryStream.write(out);
  return out;
});

categories.forEach(async (category,index) => {
  for (let i = 0; i < 20; i++) {
    var streamPromise = write(productStream, 
       `${faker.commerce.productName().toLowerCase()},${faker.lorem.paragraph()},${index}\n`);
    if (streamPromise instanceof Promise) {
      await streamPromise;
    }
  }
});