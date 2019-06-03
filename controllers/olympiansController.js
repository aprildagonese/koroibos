const pry = require('pryjs')
const Olympian = require('../models').Olympian
const Event = require('../models').Event
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const index = async (req, res) => {
  if (req.query.age == "youngest") {
    var youngest = await fetchYoungest()
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(youngest));
  } else if (req.query.age == "oldest") {
    var oldest = await fetchOldest()
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(oldest));
  } else {
    var results = await fetchOlympians()
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({olympians: results}));
  }
}

const fetchYoungest = async () => {
  var results = await Olympian.findAll({
    order: [['age', 'ASC']]
  })
  var youngest = {
    name: results[0].name,
    team: results[0].team,
    age: results[0].age,
    sport: results[0].sport,
    total_medals_won: getMedalsWon(results[0].id)
  }
  return youngest
}

const fetchOldest = async () => {
  var results = await Olympian.findAll({
    order: [['age', 'DESC']]
  })
  var oldest = {
    name: results[0].name,
    team: results[0].team,
    age: results[0].age,
    sport: results[0].sport,
    total_medals_won: getMedalsWon(results[0].id)
  }
  return oldest
}

const fetchOlympians = async () => {
  var results = await Olympian.findAll()
  var formatted = []
  results.map(olympian => {
    var entry = {
      name: olympian.name,
      team: olympian.team,
      age: olympian.age,
      sport: olympian.sport,
      total_medals_won: getMedalsWon(olympian.id)
    }
    formatted.push(entry)
  })
  return formatted
}

const getMedalsWon = async (olympianId) => {
  const allResults = await Event.findAndCountAll({
    where: {OlympianId: olympianId, medal: {[Op.not]: 'NA'}}
  })
  return await allResults.count
}

module.exports = {
  index
}
