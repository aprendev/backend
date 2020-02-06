/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const { HttpException } = use('@adonisjs/generic-exceptions');

const Challenge = use('App/Models/Challenge');

/**
 * Resourceful controller for interacting with challenges
 */
class ChallengeController {
  async create({ request, response, auth }) {
    const user = await auth.getUser();
    const userLevel = await user.level().fetch();
    if (userLevel.id === 3 || userLevel.id === 2) {
      const { days, description, title, level_id: levelId } = request.all();
      const parsedDays = parseInt(days, 10);
      if (!isNaN(parsedDays)) {
        const date = new Date();
        date.setDate(date.getDate() + days);
        const responseData = await Challenge.create({
          user_id: user.id,
          ends_in: date,
          description,
          title,
          level_id: levelId
        });
        response.status(201).json(responseData);
      } else {
        throw new HttpException(
          'O parâmetro day deve ser um número',
          400,
          'ERR_PARM_VALIDATION'
        );
      }
    } else {
      throw new HttpException(
        'Apenas instrutores ou administradores podem criar novo desafios',
        401,
        'ERR_INVALID_AUTHORIZER'
      );
    }
  }
  async update() {}
}

module.exports = ChallengeController;
