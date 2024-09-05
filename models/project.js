'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // Ассоциация с пользователем
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'Creator' }); // Указан псевдоним 'Creator'
      
      // Ассоциация с ProjectMaterials
      this.hasMany(models.ProjectMaterial, { foreignKey: 'projectId', as: 'ProjectMaterials' });
      
      // Ассоциация с размерами
      this.hasMany(models.Size, { foreignKey: 'projectId', as: 'sizes' });
    }
  }

  Project.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isTemplate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Имя таблицы, соответствующее модели `User`
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Project',
    tableName: 'Projects',
    timestamps: true,
  });

  return Project;
};
