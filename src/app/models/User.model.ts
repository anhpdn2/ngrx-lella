export class User {
  constructor(
    private email: string | undefined,
    private token: string | undefined,
    private localId: string | undefined,
    private expirationDate: Date
  ) {}

  get expireDate() {
    return this.expirationDate;
  }
}
