/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return { message: 'Hello World!' };
});

Route.post('/auth/register', 'UserController.create');
// Autenticação
Route.post('/auth', 'AuthController.create');

// Validação de token:
Route.get('/validateToken', 'AuthController.check');

Route.group(() => {
  // Desafios
  Route.post('/challenges', 'ChallengeController.create');

  // Licenças
  Route.post('/licenses', 'LicenseController.create');
  Route.get('/licenses', 'LicenseController.index');
  Route.get('/licenses/:id', 'LicenseController.show');

  // HouseKeeping
  Route.get('/admin', () => {
    /* TODO: Criar a rota admin que devolve a listagem de todos os usuários
       Cadastrados no sistema
    */
    // Todo: Goufix
    return { Error: 'Not implemented' };
  });

  Route.get('/notification/:username', 'NotificationController.show');
  Route.get('/notifications', 'NotificationController.index');
  Route.post('/notifications', 'NotificationController.create');

  // UserController
  Route.put('/users/:id', 'UserController.update');
  Route.get('/users', 'UserController.index');
  Route.get('/user/:username', 'UserController.show');
}).middleware('auth');
