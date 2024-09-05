// migrations/20240902123500-create-project-materials-table.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProjectMaterials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Projects', // Имя таблицы должно соответствовать имени, указанному в модели Project
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      materialId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Materials', // Имя таблицы должно соответствовать имени, указанному в модели Material
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProjectMaterials');
  },
};
