/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class NotificationsSchema extends Schema {
  up() {
    this.create('notifications', (table) => {
      table.increments();
      table.string('name');
      table.string('content');
      table.timestamps();
    });
  }

  down() {
    this.drop('notifications');
  }
}

module.exports = NotificationsSchema;
