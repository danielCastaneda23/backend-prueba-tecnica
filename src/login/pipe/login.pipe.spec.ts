import { LoginPipe } from './login.pipe';
import { userSchemaLogin } from '../schemas/login.schema';

describe('LoginPipe', () => {
  it('should be defined', () => {
    expect(new LoginPipe(userSchemaLogin)).toBeDefined();
  });
});
