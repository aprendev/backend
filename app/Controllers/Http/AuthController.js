"use strict";

class AuthController {
  async create({ request, auth }) {
    const { username, password } = request.all();

    const { token } = await auth.attempt(username, password);
    return { token };
  }
}

module.exports = AuthController;
