class AuthController {
  async create({ request, auth }) {
    const { username, password } = request.all();

    const tokens = await auth.withRefreshToken().attempt(username, password);
    return { tokens };
  }
}

module.exports = AuthController;
