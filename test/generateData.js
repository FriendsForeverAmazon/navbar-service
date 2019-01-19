const faker = require('faker');

function generateRandomData(userContext, events, done) {
  const query = faker.commerce.productName().toLowerCase();
  userContext.vars.query = query;
  return done();
}

module.exports = {
  generateRandomData
};