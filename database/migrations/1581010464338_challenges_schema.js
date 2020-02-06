/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ChallengesSchema extends Schema {
  up() {
    this.create('challenges', (table) => {
      table.increments();
      table.string('description').notNullable();
      table.string('title').notNullable();
      table
        .integer('level_id')
        .unsigned()
        .references('id')
        .inTable('levels');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table.timestamp('ends_in').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('challenges');
  }
}

module.exports = ChallengesSchema;
