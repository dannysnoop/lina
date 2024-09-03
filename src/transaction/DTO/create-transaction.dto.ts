import { Account } from '../../account/account.entity';

export class CreateTransactionDto {
  fromAccount: Account;
  toAccount: Account;
  amount: number;
  constructor(fromAcc: Account, toAcc: Account, amount: number) {
    this.fromAccount = fromAcc;
    this.toAccount = toAcc;
    this.amount = amount;
  }
}
