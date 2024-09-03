import { Account } from './account.entity';
import { CreateAccountDto } from './DTO/create-account.dto';
import { TransferDto } from './DTO/transfer.dto';
import { Transaction } from '../transaction/transaction.entity';

export interface IAccountService {
  FindFirstAccountById(customerId: string): Promise<Account>;
  createAccount(acc: CreateAccountDto): Promise<Account>;
  transferAmount(transfer: TransferDto): Promise<void>;
  getBalance(accountId: number): Promise<number>;
  getTransferHistory(accountId: number): Promise<Transaction[]>;
}
