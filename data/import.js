var fs = require('fs');
var csv = require('jquery-csv');
var pry = require('pryjs')
var sample = 'data/olympians.csv';

const data = () => {
  var input = fs.readFileSync(sample, 'UTF-8')
  var array = csv.toObjects(input)

  return array
}

module.exports = data()
