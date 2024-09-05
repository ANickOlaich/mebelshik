// migrations/20240902123456-remove-material-type-id.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Удаление столбца materialTypeId из таблицы Materials
    await queryInterface.removeColumn('Materials', 'materialTypeId');
  },

  down: async (queryInterface, Sequelize) => {
    // Восстановление столбца materialTypeId в таблице Materials
    await queryInterface.addColumn('Materials', 'materialTypeId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'MaterialTypes', // Имя таблицы модели `MaterialType`
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
};
