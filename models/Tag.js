const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');


class Tag extends Model {}

// set up fields and rules for Product model
Tag.init(
  { // ================================
    // TABLE COLUMN DEFINITIONS GO HERE
    // defining the Post schema
    // ================================
    id: {
      type: DataTypes.INTEGER,
      annlowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING
    }
  },
  { // ====================================
    // TABLE CONFIGURATIONS OPTIONS GO HERE
    // configure the metadata
    //=====================================
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
