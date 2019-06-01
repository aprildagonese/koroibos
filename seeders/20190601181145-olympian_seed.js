'use strict';
const pry = require('pryjs')
const data = require('../data/import')

module.exports = {
  up: async(queryInterface, Sequelize) => {
    await data.map(async record => {
      await queryInterface.bulkInsert('Olympians', [
        {
          name: record.Name,
          sex: record.Sex,
          age: record.Age,
          height: record.Height,
          weight: record.Weight,
          team: record.Team,
          games: record.Games,
          sport: record.Sport,
          event: record.Event,
          medal: record.Medal,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {})
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('Olympians', null, {})
    ])
  }
};
