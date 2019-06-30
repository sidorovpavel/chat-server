var Sequelize = require('sequelize');
var sequelize = require('../config/database');

var Message = sequelize.define('messages', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  user: {
    type: Sequelize.CHAR(32),
    allowNull: true,
    field: 'user'
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: true,
    field: 'message'
  },
  /*
  type: {
    type: Sequelize.INTEGER(4),
    allowNull: true,
    field: 'type'
  },
  */
  dt: {
    type: Sequelize.DATE,
    allowNull: true,
    field: 'dt'
  }
}, {
  tableName: 'messages',
  timestamps: false
});

module.exports = Message;
