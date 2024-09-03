import { Injectable } from '@nestjs/common';

import { AccountRepository } from './account.repository';
import { TransactionsService } from '../transaction/transaction.service';
import { Account } from './account.entity';
import { Transaction } from '../transaction/transaction.entity';
import { CustomersService } from '../customer/customer.service';
import { CreateTransactionDto } from '../transaction/DTO/create-transaction.dto';
import { TransferDto } from './DTO/transfer.dto';
import { CreateAccountDto } from './DTO/create-account.dto';
import { DataSource } from 'typeorm';
import { IAccountService } from './i.account.service';

@Injectable()
export class AccountsService implements IAccountService {
  constructor(
    private accountsRepository: AccountRepository,
    private readonly customersService: CustomersService,
    private readonly transactionsService: TransactionsService,
    private dataSource: DataSource,
  ) {}

  async FindFirstAccountById(customerId: string): Promise<Account> {
    return this.customersService.getFirstCustomer(customerId);
  }
  async createAccount(acc: CreateAccountDto): Promise<Account> {
    const { initialDeposit, customerId } = acc;
    const customer = await this.customersService.getCustomer(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }
    const account = this.accountsRepository.create({
      balance: initialDeposit,
      customer,
    });
    return this.accountsRepository.save(account);
  }

  async transferAmount(transfer: TransferDto): Promise<void> {
    const { fromAccountId, toAccountId, amount } = transfer;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const fromAccount = await this.accountsRepository.findOne({
        where: { accountId: fromAccountId },
      });
      const toAccount = await this.accountsRepository.findOne({
        where: { accountId: toAccountId },
      });

      if (!fromAccount || !toAccount) {
        throw new Error('Account not found');
      }
      if (fromAccount.balance < amount) {
        throw new Error('Insufficient funds');
      }

      fromAccount.balance -= amount;
      toAccount.balance += amount;

      await queryRunner.manager.save(fromAccount);
      await queryRunner.manager.save(toAccount);
      const createTransaction = new CreateTransactionDto(
        fromAccount,
        toAccount,
        amount,
      );
      await this.transactionsService.createTransaction(
        createTransaction,
        queryRunner,
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async getBalance(accountId: number): Promise<number> {
    const account = await this.accountsRepository.findOne({
      where: { accountId },
    });
    if (!account) {
      throw new Error('Account not found');
    }
    return account.balance;
  }

  async getTransferHistory(accountId: number): Promise<Transaction[]> {
    return this.transactionsService.getTransferHistory(accountId);
  }
}
