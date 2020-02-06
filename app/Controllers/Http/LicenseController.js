/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with licenses
 */
class LicenseController {
  async create({ auth, request, response }) {
    const { days, authorization_id: authorizationId } = request.all();
    const date = new Date();
    date.setDate(date.getDate() + days);
    const authorizer = await User.findOrFail(authorizationId);
    const authorizerLevel = await authorizer.level().fetch();
    if (authorizerLevel.id === 3 || authorizerLevel.id === 2) {
      if (days < 7 || days > 30) {
        throw new HttpException('Período de licença inválido');
      }
      const user = await auth.getUser();
      const { id } = user;
      const userLicences = await Database.select([
        'L.id',
        'L.user_id',
        'L.created_at',
        'L.ends_in',
        'L.authorization_id',
        'U.id as user_id',
        'U.username as user_name'
      ])
        .from('licenses as L')
        .innerJoin('users as U', 'L.user_id', '=', 'U.id')
        .where({ user_id: id });
      if (userLicences.length !== 0) {
        throw new HttpException(
          'Usuário já possui licença ativa',
          409,
          'ERR_LICENSE_EXISTS'
        );
      } else {
        const license = await Licence.create({
          user_id: user.id,
          ends_in: date,
          authorization_id: authorizationId
        });
        response.status(200).json({ license });
      }
    } else {
      throw new HttpException(
        'O usuário que autorizou a licença não é um instrutor',
        403,
        'ERR_INVALID_AUTHORIZER'
      );
    }
  }
}

module.exports = LicenseController;
