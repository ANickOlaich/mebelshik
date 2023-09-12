const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ImageType extends Model {}

ImageType.init(
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
    modelName: 'image-type',
  }
);

module.exports = ImageType;