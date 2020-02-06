/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return { message: 'Hello World!' };
});

Route.post('/auth/register', 'UserController.create');

Route.group(() => {
  Route.post('/auth', 'AuthController.create');
  Route.post('/licenses', 'LicenseController.create');
  Route.get('/licenses', 'LicenseController.index');
  Route.get('/licenses/:id', 'LicenseController.show');
  Route.get('/admin', () => {
    /* TODO: Criar a rota admin que devolve a listagem de todos os usuários
       Cadastrados no sistema
    */
    // Todo: Goufix
    return { Error: 'Not implemented' };
  });
  Route.put('/users/:id', 'UserController.update');
  Route.get('/users', 'UserController.index');
  Route.get('/user/:username', 'UserController.show');
}).middleware('auth');
