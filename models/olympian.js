'use strict';
module.exports = (sequelize, DataTypes) => {
  const Olympian = sequelize.define('Olympian', {
    name: DataTypes.STRING,
    sex: DataTypes.STRING,
    age: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    team: DataTypes.STRING,
    games: DataTypes.STRING,
    sport: DataTypes.STRING
  }, {});
  Olympian.associate = function(models) {
    Olympian.hasMany(models.Event)
  };
  return Olympian;
};
