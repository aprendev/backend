'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LicensesSchema extends Schema {
  up () {
    this.create('licenses', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('licenses')
  }
}

module.exports = LicensesSchema
