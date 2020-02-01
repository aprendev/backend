const BaseExceptionHandler = use('BaseExceptionHandler');
const { pick } = require('lodash');
const uuid = require('uuid/v4');

const TelegramReporter = use('App/Services/TelegramReporter');

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  constructor(...args) {
    super(...args);

    this.errorId = uuid();
  }

  async handle(error, { response }) {
    if (process.env.NODE_ENV === 'development' && error.status >= 500) {
      // eslint-disable-next-line prefer-rest-params
      return super.handle(...arguments);
    }

    // https://lodash.com/docs/4.17.15#pick
    const visibleError = pick(error, ['status', 'message', 'code']);

    response.status(error.status).json({
      error: true,
      error_id: this.errorId,
      status: 500,
      code: 'ERR_UNKNOWN',
      message: 'Erro desconhecido.',
      ...visibleError
    });
  }

  get ignoredReporterErrorCodes() {
    return ['___ERR_FAILED_LOGIN'];
  }

  async report({ status, message, stack, code }) {
    if (this.ignoredReporterErrorCodes.includes(code)) {
      return;
    }

    const reportMessage = [
      `Erro *${status}*: ${this.errorId}`,
      `Código: ${code}`,
      `Em: ${new Date().toLocaleString('pt-BR')}`,
      `\`${message}\``,
      ``,
      '*Stack:*',
      stack.repeat(10)
    ].join('\n');

    try {
      await TelegramReporter.sendMessage(reportMessage.substr(0, 4000));
    } catch (err) {
      console.log(err.response.body);
    }
  }
}

module.exports = ExceptionHandler;
