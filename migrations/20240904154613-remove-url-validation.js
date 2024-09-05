// migrations/[timestamp]-remove-url-validation.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Photos', 'url', {
      type: Sequelize.STRING,
      allowNull: false,
      // Убедитесь, что валидация удалена
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Photos', 'url', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    });
  }
};
