"use strict";

const User = use("App/Models/User");

class UserController {
  async index() {}
  async show({ params, response }) {
    const username = params.username;
    const user = await User.findBy("username", username);
    if (user) {
      return user;
    } else {
      response.status(404).send({ error: "Usuário não encontrado" });
    }
  }
  async create({ request, response }) {
    const userRequestData = request.only([
      "username",
      "password",
      "email",
      "level",
      "github_username",
      "work_shift",
      "points"
    ]);

    const userExists = await User.findBy("username", userRequestData.username);
    if (userExists) {
      return response.status(409).json({ error: "Usuário já existente!" });
    } else {
      const user = await User.create(userRequestData);
      return user;
    }
  }
}

module.exports = UserController;
