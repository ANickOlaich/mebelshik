// models/Material.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    static associate(models) {
      // Ассоциация с ProjectMaterials
      this.hasMany(models.ProjectMaterial, { foreignKey: 'materialId', as: 'ProjectMaterials' });
    }
  }

  Material.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    supplier: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    articleNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Material',
    tableName: 'Materials',
    timestamps: true,
  });

  return Material;
};

