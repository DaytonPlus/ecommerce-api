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
  name: 'Jhon',
  email: 'jhon@user.local',
  password: 'jhon',
  is_admin: false
}];

(async () => {
  for(let user of users) {
    let exists = UserModel.findUserByEmail(user.email);
    let res = exists ? 'User alrrady exists!' : await UserModel.createUser(user);
    console.log(user.email, res);
  }
  process.exit(1);
})();