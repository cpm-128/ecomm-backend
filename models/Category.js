const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

// define the table
Category.init(
  {  // ================================
     // TABLE COLUMN DEFINITIONS GO HERE
     // defining the Post schema
     // ================================
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {  // ====================================
     // TABLE CONFIGURATIONS OPTIONS GO HERE
     // configure the metadata
     //=====================================
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
