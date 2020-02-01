/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LevelSchema extends Schema {
  up() {
    this.create('levels', (table) => {
      table.increments();

      table
        .string('name', 120)
        .unique()
        .notNullable();

      table
        .string('color', 30)
        .notNullable()
        .defaultTo('#000');

      table.timestamps();
    });
  }

  down() {
    this.drop('levels');
  }
}

module.exports = LevelSchema;
