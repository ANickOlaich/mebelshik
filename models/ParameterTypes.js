'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ParameterType extends Model {
    static associate(models) {
      this.hasMany(models.Parameter, { foreignKey: 'typeId' });
    }
  }
  ParameterType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'ParameterType',
    tableName: 'ParameterTypes', // Убедитесь, что имя таблицы указано правильно
  });
  return ParameterType;
};
