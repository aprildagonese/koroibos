var fs = require('fs');
var csv = require('jquery-csv');
var pry = require('pryjs')
var sample = 'data/olympians.csv';
const Olympian = require('../models').Olympian
const OlympianEvent = require('../models').OlympianEvent
const Sport = require('../models').Sport
const Event = require('../models').Event

const data = async () => {
  try {
    var input = await fs.readFileSync(sample, 'UTF-8')
    var data = await csv.toObjects(input)

    await data.map(async record => {
      var sport = await addSport(record)
      await console.log("HERE ARE MY SPORTS: ", sport)
      var eventy = await addEvent(record, sport[0].dataValues.id)
      await console.log("HERE ARE MY EVENTS: ", eventy)
      var olympian = await addOlympian(record, sport[0].dataValues.id)
      await console.log("HERE IS MY OLYMPIAN: ", olympian)
      var olympianEvent = await addOlympianEvent(record, olympian[0].dataValues.id, eventy[0].dataValues.id)
      await console.log("HERE IS MY OLY-EVENT: ", olympianEvent)
    })
  } catch(err) {
    console.log(err)
  }
}

const addSport = (record) => {
  return Sport.findOrCreate({
    where: {
      name: record.Sport
    }
  })
  .then(sport => {
    return sport
  })
  .error(error => {
    console.log(error)
  })
}

const addEvent = (record, sportId) => {
  return Event.findOrCreate({
    where: {
      name: record.Event,
      SportId: sportId
    }
  })
  .then(eventy => {
    return eventy
  })
  .error(error => {
    console.log(error)
  })
}

const addOlympian = (record, sportId) => {
  return Olympian.findOrCreate({
    where: {
      name: record.Name,
      sex: record.Sex,
      age: record.Age,
      height: record.Height,
      weight: record.Weight,
      team: record.Team,
      games: record.Games,
      SportId: sportId,
    }
  })
  .then(olympian => {
    return olympian
  })
  .error(error => {
    console.log(error)
  })
}

const addOlympianEvent = (record, olympianId, eventId) => {
  return OlympianEvent.findOrCreate({
    where: {
      OlympianId: olympianId,
      EventId: eventId,
      medal: record.Medal
    }
  })
  .then(olympianEvent => {
    return olympianEvent
  })
  .error(error => {
    console.log(error)
  })
}

module.exports = data()
