/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments(); // Id
      table
        .string('username')
        .notNullable()
        .unique(); // String Username
      table
        .string('email')
        .notNullable()
        .unique(); // String email
      table.string('password').notNullable(); // String password

      // "Rank do usuário"
      table
        .integer('level_id')
        .unsigned()
        .references('id')
        .inTable('levels');

      table.string('github_username').notNullable(); // Uusário do github
      table.string('work_shift').notNullable(); // Turno
      table.string('points').notNullable(); // XP
      table.timestamps(); // created_at + updated_at
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
