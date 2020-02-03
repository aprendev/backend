/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with licenses
 */
class LicenseController {
  /* TODO:
    Criar os métodos para inclusão e alteração de licenças.

    Regras de negócio:
     - Um usuário só pode ter uma licença ativa
     - Um usuário deve ficar em licença por no mínimo 7 dias e no máximo 30
     - O usuário que não solicitar a baixa da licença dentro do prazo L + 1, será automaticamente desativado.
     - A solicitação de licença deve possuir a autorização de um instrutor ou admin
  */
  // Todo: Goufix
}

module.exports = LicenseController;
