'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    medal: DataTypes.STRING,
    OlympianId: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.Olympian)
  };
  return Event;
};
