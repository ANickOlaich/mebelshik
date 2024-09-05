'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Добавляем новые колонки
    await queryInterface.addColumn('Projects', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('Projects', 'isTemplate', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });

    // Обновляем старые записи, если нужно задать конкретные значения для старых записей
    await queryInterface.bulkUpdate('Projects', {
      description: '', // Пустое описание для всех старых записей
      isTemplate: false // Флаг false для всех старых записей
    }, {
      // Условие для обновления всех записей (можно изменить, если нужно)
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Удаляем колонки при откате миграции
    await queryInterface.removeColumn('Projects', 'description');
    await queryInterface.removeColumn('Projects', 'isTemplate');
  }
};
