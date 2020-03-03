const Notification = use('App/Models/Notification');

class Init {
  async run() {
    await Notification.create({
      name: 'Teste',
      content: 'Loren ipsum dolor sit'
    });

    console.log('Notificações criadas.');
  }
}

module.exports = Init;
