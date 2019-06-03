'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
      'Events',
      ['name'],
      {
        type: 'unique',
        name: 'unique_event_constraint'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'Events',
      ['name'],
      {
        type: 'unique',
        name: 'unique_event_constraint'
      }
    );
  }
};
