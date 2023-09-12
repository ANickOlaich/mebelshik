const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Gallery extends Model {}

Gallery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    project_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'project',
        key: 'id',
      },
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    image_type:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'image-type',
        key: 'id',
      },
    },
    public:{
      type: DataTypes.BOOLEAN,
      allovNull:false,
      defaultValue:false
    },
    is_trash:{           //В корзине или нет
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'gallery',
  }
);

module.exports = Gallery;