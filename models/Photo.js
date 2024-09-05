// models/Photo.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Photo extends Model {}

  Photo.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false
      // Удаляем валидацию isUrl
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Photo',
    tableName: 'Photos',
    timestamps: true
  });

  return Photo;
};
