const dotenv = require('dotenv');

dotenv.config({ path: '.env.test' });

beforeEach(() => {
  jest.resetModules();
});