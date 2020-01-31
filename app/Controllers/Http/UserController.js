const User = use('App/Models/User');

class UserController {
  async index({ response }) {
    const users = await User.query()
      .select([
        'id',
        'username',
        'email',
        'level',
        'github_username',
        'work_shift',
        'points'
      ])
      .fetch();
    response.status(200).send(users);
  }

  async show({ params, response }) {
    const username = params.username;
    const user = await User.query()
      .select([
        'id',
        'username',
        'email',
        'level',
        'github_username',
        'work_shift',
        'points'
      ])
      .where('username', username)
      .fetch();
    if (user) {
      return user;
    } else {
      response.status(404).send({ error: 'Usuário não encontrado' });
    }
  }

  async create({ request, response }) {
    const userRequestData = request.only([
      'username',
      'password',
      'email',
      'level',
      'github_username',
      'work_shift',
      'points'
    ]);

    const userExists = await User.findBy('username', userRequestData.username);
    if (userExists) {
      return response.status(409).json({ error: 'Usuário já existente!' });
    } else {
      const user = await User.create(userRequestData);
      return { user };
    }
  }
}

module.exports = UserController;
