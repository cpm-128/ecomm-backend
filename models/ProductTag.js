const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  { // ================================
    // TABLE COLUMN DEFINITIONS GO HERE
    // defining the Post schema
    // ================================
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      // FOREIGN KEY LINK
      references: {
        model: 'product',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      // FOREGIN KEY LINK
      references: {
        model: 'tag',
        key: 'id'
      }
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
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
