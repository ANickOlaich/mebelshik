'use strict';
module.exports = (sequelize, DataTypes) => {
  const Parameter = sequelize.define('Parameter', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isGlobal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ParameterTypes', // Убедитесь, что имя таблицы указано правильно
        key: 'id',
      },
    },
  });

  Parameter.associate = function(models) {
    Parameter.belongsTo(models.ParameterType, { foreignKey: 'typeId' });
  };

  return Parameter;
};

