import * as bcrypt from 'bcrypt';
export class Helper {
  static hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
  static comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
