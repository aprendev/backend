'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChallengesSchema extends Schema {
  up () {
    this.create('challenges', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('challenges')
  }
}

module.exports = ChallengesSchema
