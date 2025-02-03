'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add foreign key constraint to 'user_id' referencing 'users.id'
    await queryInterface.addConstraint('roles', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'roles_user_id_fk', // name of the constraint
      references: {
        table: 'users', // table name being referenced
        field: 'id', // column being referenced
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove foreign key constraint
    await queryInterface.removeConstraint('roles', 'roles_user_id_fk');
  },
};
