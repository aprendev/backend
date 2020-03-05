const Notification = use('App/Models/Notification');
const User = use('App/Models/User');
const { HttpException } = use('@adonisjs/generic-exceptions');

class NotificationController {
  async create({ request, response }) {
    const { tittle, content } = request.all();

    await Notification.create(tittle, content)
      .then((res) => response.status(201).json(res))
      .catch((err) => {
        console.log(err);
        throw new HttpException(
          'Não foi possível criar o aviso',
          400,
          'ERR_FAILED_CREATE_NOTIFICATION'
        );
      });
  }

  async show({ response, params }) {
    const { username } = params;
    const user = await User.findBy('username', username);
    const notifications = await Notification.query().fetch();
    response.json(user, notifications);
  }

  async index({ response }) {
    response.json({
      message: 'Err. Not implemented'
    });
  }
}

module.exports = NotificationController;
