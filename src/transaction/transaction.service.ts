import { Injectable } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto } from './DTO/create-transaction.dto';
import { TransactionRepository } from './transaction.repository';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TransactionsService {
  constructor(private transactionsRepository: TransactionRepository) {}

  async createTransaction(
    createTransaction: CreateTransactionDto,
    queryRunner?: QueryRunner,
  ): Promise<Transaction> {
    const { fromAccount, toAccount, amount } = createTransaction;
    if (queryRunner) {
      const createTran = plainToInstance(Transaction, createTransaction);
      return await queryRunner.manager.save(createTran);
    } else {
      const transaction = this.transactionsRepository.create({
        fromAccount,
        toAccount,
        amount,
        date: new Date(),
      });
      return this.transactionsRepository.save(transaction);
    }
  }

  async getTransferHistory(accountId: number): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      where: [{ fromAccount: { accountId } }, { toAccount: { accountId } }],
      relations: ['fromAccount', 'toAccount'],
    });
  }
}
