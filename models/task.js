// models/Task.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // Define associations here
      this.belongsTo(models.Project, { foreignKey: 'projectId' });
      this.belongsTo(models.Parameter, { foreignKey: 'parameterId' });
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Project',
        key: 'id',
      }
    },
    parameterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Parameter',
        key: 'id',
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
  });

  return Task;
};
