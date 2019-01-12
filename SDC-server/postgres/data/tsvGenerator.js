var faker = require('faker');
var fs = require('fs');

const categoryStream = fs.createWriteStream('category.data.tsv');
const productStream = fs.createWriteStream('product.data.tsv');
const categoryNames = ['electronics', 'clothes', 'games', 'appliances', 'books'];

const write = (stream, data) => {
  if(!stream.write(data)){
    return new Promise(resolve => stream.once('drain', resolve));
  }
  return true;
}

const categories = categoryNames.map(category => { 
  let out = `${category}dogs\tdogscurrent_timestamp\tcurrent_timestamp\n`;
  categoryStream.write(out);
  return out;
});

categories.forEach(async (category,index) => {
  for (let i = 0; i < 20; i++) {
    var streamPromise = write(productStream, 
       `${faker.commerce.productName().toLowerCase()}\t${faker.lorem.paragraph()}\tcurrent_timestamp\tcurrent_timestamp\n`);
    if (streamPromise instanceof Promise) {
      await streamPromise;
    }
  }
});

/*
\t${index}
, createdAt, updatedAt
, createdAt, updatedAt
NOW()\tNOW()
\tNOW()\tNOW()
*/