const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model {}

Task.init(
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
    price:{
      type:DataTypes.STRING,
      allowNull:true
    },
    imageSrc:{
      type:DataTypes.STRING,
      allowNull:true
    },
    sku:{
      type:DataTypes.STRING,
      allowNull:true
    },
    url:{
      type: DataTypes.STRING,
      allowNull:true
    },
    provider:{
      type:DataTypes.STRING,
      allowNull:true
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    project_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'project',
        key: 'id',
      },
    },
    public:{
      type: DataTypes.BOOLEAN,
      allovNull:false,
      defaultValue:false
    },
    checked:{       //Выполнено
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    deleted:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    visible_for_customer:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    task_type_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model:'task-type',
        key:'id',
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'task',
  }
);

module.exports = Task;