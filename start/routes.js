/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', async () => {
  return { message: 'Hello World!' };
});

Route.post('/auth/register', 'UserController.create');
Route.post('/auth', 'AuthController.create');
Route.get('/users', 'UserController.index');
Route.get('/user/:username', 'UserController.show');

Route.group(() => {
  Route.get('/admin', async ({ auth }) => {
    const tokens = await auth.listTokens();
    return { tokens };
  });
}).middleware('auth');
