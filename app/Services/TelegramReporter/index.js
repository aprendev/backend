const Env = use('Env');
const got = require('got');
const FallbackReporter = require('./FallbackReporter');

const BASE_TELEGRAM_API = 'https://api.telegram.org';

class TelegramReporter {
  constructor(chatId, tokenId) {
    if (!chatId || !tokenId) {
      if (Env.get('NODE_ENV') !== 'production') {
        // Should ONLY be used in development and testing environments when the
        // Telegram API keys are not defined.
        //
        // `FallbackReporter` throws an error when constructed in a production
        // environment.
        return new FallbackReporter();
      }

      throw new Error(
        'Missing `TELEGRAM_CHAT_ID` or `TELEGRAM_TOKEN` environment variables.'
      );
    }

    this.chatId = chatId;
    this.tokenId = tokenId;
    this.messageURI = `${BASE_TELEGRAM_API}/bot${tokenId}/sendMessage`;
  }

  _getPayload(data) {
    return {
      chat_id: this.chatId,
      disable_notification: false,
      ...data
    };
  }

  async sendMessage(text) {
    const data = this._getPayload({ text });

    const body = await got.post(this.messageURI, { json: data }).json();
    return body.ok;
  }
}

// Singleton, para não precisar de criar uma instância nova a cada erro.
module.exports = new TelegramReporter(
  Env.get('TELEGRAM_CHAT_ID'),
  Env.get('TELEGRAM_TOKEN')
);
