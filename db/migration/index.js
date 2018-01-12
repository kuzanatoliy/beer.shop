const seeders = require('../seeders');
const queryInterface = require('./queryInterface');
const { close } = require('../connection');

const migrate = async () => {
  try {
    await seeders.orderProducts.down(queryInterface);
    await seeders.orders.down(queryInterface);
    await seeders.userAddresses.down(queryInterface);
    await seeders.userDiscounts.down(queryInterface);
    await seeders.users.down(queryInterface);
    await seeders.productCounts.down(queryInterface);
    await seeders.productVariants.down(queryInterface);
    await seeders.products.down(queryInterface);
    await seeders.cities.down(queryInterface);
    await seeders.orderStatuses.down(queryInterface);
    await seeders.productTypes.down(queryInterface);
    await seeders.roles.down(queryInterface);
    await seeders.variants.down(queryInterface);

    await seeders.cities.up(queryInterface);
    await seeders.orderStatuses.up(queryInterface);
    await seeders.productTypes.up(queryInterface);
    await seeders.roles.up(queryInterface);
    await seeders.variants.up(queryInterface);
    await seeders.products.up(queryInterface);
    await seeders.productVariants.up(queryInterface);
    await seeders.productCounts.up(queryInterface);
    await seeders.users.up(queryInterface);
    await seeders.userDiscounts.up(queryInterface);
    await seeders.userAddresses.up(queryInterface);
    await seeders.orders.up(queryInterface);
    await seeders.orderProducts.up(queryInterface);
  } catch (err) {
    throw err;
  }
  close();
};

migrate();
