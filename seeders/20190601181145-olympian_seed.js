'use strict';
const data = require('../data/import')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('Olympians', null, {})
    ])
  }
};
