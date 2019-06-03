'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
      'Olympians',
      ['name'],
      {
        type: 'unique',
        name: 'unique_name_constraint'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'Olympians',
      ['name'],
      {
        type: 'unique',
        name: 'unique_name_constraint'
      }
    );
  }
};
