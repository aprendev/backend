const Env = use('Env');

class FallbackReporter {
  constructor() {
    if (Env.get('NODE_ENV') === 'production') {
      throw new Error(
        '`FallbackReporter` should NOT be used in a production environment. Set the Telegram API keys to use the default reporter.'
      );
    }
  }

  sendMessage(text) {
    // Set the `MUTE_TELEGRAM_FALLBACK_REPORTER` environment variable to a
    // truthy value to disable the fallback reporter logs.
    if (Env.get('MUTE_TELEGRAM_FALLBACK_REPORTER')) {
      return Promise.resolve();
    }

    // Should return a Promise match the default reporter (`TelegramReporter`)
    // API.
    return Promise.resolve(console.log(text));
  }
}

// Singleton, para não precisar de criar uma instância nova a cada erro.
module.exports = FallbackReporter;
