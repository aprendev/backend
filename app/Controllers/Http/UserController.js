const User = use('App/Models/User');

class UserController {
  constructor() {
    this.requestParams = [
      'username',
      'password',
      'email',
      'level',
      'github_username',
      'work_shift',
      'points'
    ];
  }
  async index({ response }) {
    const users = await User.query()
      .setHidden(['password'])
      .fetch();
    response.status(200).send(users);
  }

  async show({ params, response }) {
    const username = params.username;
    const user = await User.findBy('username', username);
    if (user) {
      return user;
    } else {
      response.status(404).send({ error: 'Usuário não encontrado' });
    }
  }

  async create({ request, response }) {
    const newUserData = request.only(this.requestParams);

    const userExists = await User.findBy('username', newUserData.username);
    if (userExists) {
      return response.status(409).json({ error: 'Usuário já existente!' });
    } else {
      const user = await User.create(newUserData);
      return { user };
    }
  }
  async update({ params, request, response }) {
    const user = await User.find(params.id);
    const newUserData = request.only(this.requestParams);
    await user.merge({ ...newUserData });
    await user.save();
    return response.status(200).json({ user });
  }
}

module.exports = UserController;
