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
  var youngest = createResult(results[0])
  return youngest
}

const fetchOldest = async () => {
  var results = await Olympian.findAll({
    order: [['age', 'DESC']]
  })
  var oldest = createResult(results[0])
  return oldest
}

const fetchOlympians = async () => {
  var results = await Olympian.findAll()
  var formatted = results.map(olympian => {
    return createResult(olympian)
  })
  return Promise.all(formatted).then(result => {return result})
}

const createResult = async (olympian) => {
  var count = await getMedalsWon(olympian.id)
  var result = await {
    name: olympian.name,
    team: olympian.team,
    age: olympian.age,
    sport: olympian.sport,
    total_medals_won: count
  }
  return await result
}

const getMedalsWon = async (olympianId) => {
  const allResults = await Event.findAll({
    where: {OlympianId: olympianId, medal: {[Op.not]: 'NA'}}
  })
  return await allResults.length
}

module.exports = {
  index
}
