const Level = use('App/Models/Level');

class Init {
  async run() {
    for (const level of await this.getLevels()) {
      await Level.create(level);
    }

    console.log('Levels criados.');
  }

  async getLevels() {
    return [
      { name: 'Aprendiz', color: '#ccc' },
      { name: 'Instrutor', color: '#ff0' },
      { name: 'Admin', color: '#f00' }
    ];
  }
}

module.exports = Init;
