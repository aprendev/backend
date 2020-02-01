const Database = use('Database');

class Init {
  getDatabases() {
    return ['users', 'levels'];
  }

  async run() {
    for (const database of this.getDatabases()) {
      await Database.raw(
        `TRUNCATE TABLE "${database}" restart identity cascade;`
      );

      await process.stdout.write(`${database} `);
    }

    console.log('\nTodos os bancos foram truncados.');
  }
}

module.exports = Init;
