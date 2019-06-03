var fs = require('fs');
var csv = require('jquery-csv');
var pry = require('pryjs')
var sample = 'data/olympians.csv';
const Olympian = require('../models').Olympian

const data = async () => {
  try {
    var input = await fs.readFileSync(sample, 'UTF-8')
    var data = await csv.toObjects(input)

    await data.map(async record => {
      var olympian = await addOlympian(record)
      await addEvent(olympian.id)
    })
  } catch(err) {
    console.log(err)
  }
}

const addOlympian = async (record) => {
  return await Olympian.findOrCreate({
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
}

const addEvent = async (olympianId) => {
  return await Event.findOrCreate({
    where: {
      event: record.Event,
      medal: record.Medal,
      OlympianId: olympianId
    }
  })
}

module.exports = data()
