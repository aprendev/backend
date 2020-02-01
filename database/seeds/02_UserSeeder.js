const User = use('App/Models/User');
const Level = use('App/Models/Level');

const getLevel = (name) =>
  Level.findByOrFail('name', name).then((level) => level.toJSON());

class Init {
  async run() {
    for (const user of await this.getUsers()) {
      console.log(user);
      await User.create(user);
    }

    console.log('Users criados.');
  }

  async getUsers() {
    const { id: admin } = await getLevel('Admin');
    const { id: instrutor } = await getLevel('Instrutor');
    const { id: aprendiz } = await getLevel('Aprendiz');

    return [
      {
        username: 'Goufix',
        email: 'Goufix@apren.dev',
        password: 'senha',
        level_id: admin,
        github_username: 'Goufix',
        work_shift: 'Noite',
        points: '0'
      },
      {
        username: 'Luiz',
        email: 'lffg@apren.dev',
        password: 'senha',
        level_id: instrutor,
        github_username: 'lffg',
        work_shift: 'Noite',
        points: '0'
      },
      {
        username: 'Eliton',
        email: 'Eliton@apren.dev',
        password: 'senha',
        level_id: aprendiz,
        github_username: 'elitondioni',
        work_shift: 'Noite',
        points: '0'
      }
    ];
  }
}

module.exports = Init;
