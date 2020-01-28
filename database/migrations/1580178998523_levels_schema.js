"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LevelsSchema extends Schema {
  up() {
    this.create("levels", table => {
      table.increments();
      table
        .string("name")
        .notNullable()
        .unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("levels");
  }
}

module.exports = LevelsSchema;
