export class TransferDto {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  constructor(fromAccountId : number, toAccountId: number, amount) {
    this.fromAccountId = fromAccountId,
      this.toAccountId = toAccountId,
      this.amount = amount
  }
}
