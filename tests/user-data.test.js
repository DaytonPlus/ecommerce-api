import UserModel from '../src/models/user.model.js';

const users = [{
  name: 'Adminer',
  email: 'admin@user.local',
  password: 'admin',
  is_admin: true
}, {
  name: 'Max',
  email: 'max@user.local',
  password: 'max',
  is_admin: false
}, {
  name: 'Vex',
  email: 'vex@user.local',
  password: 'vex',
  is_admin: false
}];

(async () => {
  for(let user of users) {
    let exists = await UserModel.findUserByEmail(user.email);
    let res = exists ? 'User alrrady exists!' : await UserModel.createUser(user);
    console.log(user.email, res, exists);
  }
  process.exit(1);
})();
