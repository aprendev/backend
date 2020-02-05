/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LicensesSchema extends Schema {
  up() {
    this.create('licenses', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table.string('ends_in').notNullable();
      table
        .integer('authorization_id')
        .unsigned()
        .references()
        .inTable('users');

      table.timestamps();
    });
  }

  down() {
    this.drop('licenses');
  }
}

module.exports = LicensesSchema;
