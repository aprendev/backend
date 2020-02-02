const { HttpException } = use('@adonisjs/generic-exceptions');
const Database = use('Database');

class AuthController {
  async create({ request, auth }) {
    const { username, password } = request.all();

    const user = await Database.select([
      'U.id',
      'U.username',
      'L.id as level_id',
      'L.name as level_name',
      'L.color as level_color'
    ])
      .from('users as U')
      .innerJoin('levels as L', 'L.id', '=', 'U.level_id')
      .where({ username });

    if (!user) {
      throw new HttpException(
        'Usuário e/ou senha incorretos.',
        401,
        'ERR_FAILED_LOGIN'
      );
    }

    try {
      const tokens = await auth.withRefreshToken().attempt(username, password);
      return { tokens, user };
    } catch (error) {
      throw new HttpException(
        'Usuário e/ou senha incorretos.',
        401,
        'ERR_FAILED_LOGIN'
      );
    }
  }
}
module.exports = AuthController;

// Coloca um usuário e senha válidos aqui em baixo por favor.
// User = Goufix
// Pass = senha
