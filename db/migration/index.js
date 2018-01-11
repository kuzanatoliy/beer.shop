const seeders = require('../seeders');
const queryInterface = require('./queryInterface');

seeders.cities.down(queryInterface);
seeders.orderStatuses.down(queryInterface);
seeders.productTypes.down(queryInterface);
seeders.roles.down(queryInterface);
seeders.variants.down(queryInterface);

seeders.cities.up(queryInterface);
seeders.orderStatuses.up(queryInterface);
seeders.productTypes.up(queryInterface);
seeders.roles.up(queryInterface);
seeders.variants.up(queryInterface);
