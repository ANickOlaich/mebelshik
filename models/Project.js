const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Project extends Model {}

Project.init(
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
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    status: {
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue: "Новый"
    },
    public:{
      type: DataTypes.BOOLEAN,
      allovNull:false,
      defaultValue:false
    },
    is_actual:{           //В архиве или нет
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'project',
  }
);

module.exports = Project;