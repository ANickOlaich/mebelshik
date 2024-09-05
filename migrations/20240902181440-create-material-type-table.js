// migrations/20240902123456-create-material-type-table.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('MaterialTypes', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER,
          },
          name: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true,
          },
          image: {
              type: Sequelize.STRING,
              allowNull: true,
          },
          description: {
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
      await queryInterface.dropTable('MaterialTypes');
  },
};
