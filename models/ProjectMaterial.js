// models/ProjectMaterial.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProjectMaterial extends Model {
    static associate(models) {
      // Ассоциация с проектом
      this.belongsTo(models.Project, { foreignKey: 'projectId', as: 'Project' });

      // Ассоциация с материалом
      this.belongsTo(models.Material, { foreignKey: 'materialId', as: 'Material' });
    }
  }

  ProjectMaterial.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Projects', // Имя таблицы, соответствующее модели `Project`
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    materialId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Materials', // Имя таблицы, соответствующее модели `Material`
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'ProjectMaterial',
    tableName: 'ProjectMaterials',
    timestamps: true,
  });

  return ProjectMaterial;
};
