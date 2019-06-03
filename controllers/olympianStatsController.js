const pry = require('pryjs')
const Olympian = require('../models').Olympian
const Event = require('../models').Event
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const index = async (req, res) => {
  var results = await fetchStats()
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({olympian_stats: results}));
}

const fetchStats = async () => {
  var count = await olympianCount()
  var aveMale = await aveMaleWeight()
  var aveFemale = await aveFemaleWeight()
  var age = await aveAge()
  var formatted =
      {
        "total_competing_olympians": count,
        "average_weight":
          {
            "unit": "kg",
            "male_olympians": aveMale,
            "female_olympians": aveFemale
          },
        "average_age": age
      }
  return formatted
}

const olympianCount = async () => {
  var count = await Olympian.findAll()
  return await count.length
}

const aveMaleWeight = async () => {
  var aveWeight = await Olympian.findAll({
    attributes: [[Sequelize.fn('AVG', Sequelize.col('weight')), 'weight']],
    where: {sex: 'M'}
  });
  return await Number.parseFloat(aveWeight[0].dataValues.weight).toFixed(2)
}

const aveFemaleWeight = async () => {
  var aveWeight = await Olympian.findAll({
    attributes: [[Sequelize.fn('AVG', Sequelize.col('weight')), 'weight']],
    where: {sex: 'F'}
  });
  return await Number.parseFloat(aveWeight[0].dataValues.weight).toFixed(2)
}

const aveAge = async () => {
  var average = await Olympian.findAll({
    attributes: [[Sequelize.fn('AVG', Sequelize.col('age')), 'age']]
  });
  return await Number.parseFloat(average[0].dataValues.age).toFixed(2)
}

module.exports = {
  index
}
