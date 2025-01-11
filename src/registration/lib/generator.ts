import { v4 as uuidv4 } from 'uuid';

export class Generator {
  static generatepassword(): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  static generateEmailandId(name: string): { email: string; id: string } {
    const uuid = uuidv4();
    const email = `${name.slice(0, 2)}${uuid.slice(0, 4)}.students@gmail.com`;
    return { email: email, id: uuid.slice(0, 4) };
  }
}
