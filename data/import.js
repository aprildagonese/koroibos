var fs = require('fs');
var csv = require('jquery-csv');
var pry = require('pryjs')
var sample = 'data/olympians.csv';
const Olympian = require('../models').Olympian
const Event = require('../models').Event

const data = async () => {
  try {
    var input = await fs.readFileSync(sample, 'UTF-8')
    var data = await csv.toObjects(input)

    await data.map(async record => {
      var olympian = await addOlympian(record)
      var name = await addEvent(record, olympian[0].dataValues.id)
    })
  } catch(err) {
    console.log(err)
  }
}

const addOlympian = (record) => {
  return Olympian.findOrCreate({
    where: {
      name: record.Name,
      sex: record.Sex,
      age: record.Age,
      height: record.Height,
      weight: record.Weight,
      team: record.Team,
      games: record.Games,
      sport: record.Sport,
    }
  })
  .then(olympian => {
    return olympian
  })
  .error(error => {
    console.log(error)
  })
}

const addEvent = (record, olympianId) => {
  return Event.findOrCreate({
    where: {
      name: record.Event,
      medal: record.Medal,
      OlympianId: olympianId
    }
  })
  .then(name => {
    return name
  })
  .error(error => {
    console.log(error)
  })
}

module.exports = data()
