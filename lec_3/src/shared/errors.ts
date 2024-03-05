export class UserAlreadyExists extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
