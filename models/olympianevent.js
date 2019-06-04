'use strict';
module.exports = (sequelize, DataTypes) => {
  const OlympianEvent = sequelize.define('OlympianEvent', {
    OlympianId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER,
    medal: DataTypes.STRING
  }, {});
  OlympianEvent.associate = function(models) {
    OlympianEvent.belongsTo(models.Event)
    OlympianEvent.belongsTo(models.Olympian)
  };
  return OlympianEvent;
};
