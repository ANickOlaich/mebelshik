// models/Size.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    static associate(models) {
      // Размеры связаны с проектами
      this.belongsTo(models.Project, { 
        foreignKey: 'projectId',
        as: 'project'
      });
    }
  }

  Size.init({
    sizeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dimension: {
      type: DataTypes.STRING,
      allowNull: false
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Projects', // Имя таблицы модели `Project`
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Size',
    tableName: 'Sizes',
    timestamps: true // Добавит поля createdAt и updatedAt автоматически
  });

  return Size;
};
