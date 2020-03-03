/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserNotificationsSchema extends Schema {
  up() {
    this.create('user_notifications', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');

      table
        .integer('notification_id')
        .unsigned()
        .references('id')
        .inTable('notifications');

      table.boolean('closed');

      table.timestamps();
    });
  }

  down() {
    this.drop('user_notifications');
  }
}

module.exports = UserNotificationsSchema;
