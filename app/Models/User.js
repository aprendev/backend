/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class User extends Model {
  static get hidden() {
    return ['password'];
  }
  static boot() {
    super.boot();
    // Password hashs
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  level() {
    return this.belongsTo('App/Models/Level');
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }

  notifications() {
    //prettier-ignore
    return this
    .belongsToMany('App/Models/Notification')
    .pivotTable('user_notifications');
  }
}

module.exports = User;
