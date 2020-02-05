/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', async () => {
  return { message: 'Hello World!' };
});

Route.post('/auth/register', 'UserController.create');
Route.post('/auth', 'AuthController.create');

Route.group(() => {
  Route.get('/admin', async () => {
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
