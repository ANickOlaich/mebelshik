const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TaskType extends Model {}

TaskType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    image_url:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"/image/void.jpg"
    },
    sort:{
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1000,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'task-type',
  }
);

module.exports = TaskType;