var faker = require('faker');
var fs = require('fs');

const categoryStream = fs.createWriteStream(__dirname + '/data/category.data.csv');
const productStream = fs.createWriteStream(__dirname + '/data/product.data.csv');
const categoryNames = ['electronics', 'clothes', 'games', 'appliances', 'books'];

const categories = categoryNames.map(category => { 
  let out = {category,image:''}
  categoryStream.write(JSON.stringify(out));
  return out;
});

const write = (stream, data) => {
  if(!stream.write(data)){
    return new Promise(resolve => stream.once('drain', resolve));
  }
  return true;
}


categories.forEach(async (category,index) => {
  for (let i = 0; i < 2000000; i++) {
    var streamPromise = write(
      productStream, 
      JSON.stringify({
        name: faker.commerce.productName().toLowerCase(),
        description: faker.lorem.paragraph(),
        categoryId: index
      }));
    if (streamPromise instanceof Promise) {
      await streamPromise;
    }
  }
});