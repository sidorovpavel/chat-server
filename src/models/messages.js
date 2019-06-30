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
    type: Sequelize.STRING+ ' CHARSET utf8 COLLATE utf8_unicode_ci' ,
    allowNull: true,
    field: 'user'
  },
  message: {
    type: Sequelize.STRING+ ' CHARSET utf8 COLLATE utf8_unicode_ci' ,
    allowNull: true,
    field: 'message'
  },
  dt: {
    type: Sequelize.DATE,
    allowNull: true,
    field: 'dt'
  }
}, {
  tableName: 'messages',
  timestamps: false,
  charset: 'utf8',
  collate: 'utf8_unicode_ci'
});

module.exports = Message;
