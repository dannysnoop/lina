import { Module } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { TransactionsService } from './transaction.service';

@Module({
  controllers: [],
  providers: [TransactionsService, TransactionRepository],
  exports: [TransactionsService, TransactionRepository],
})
export class TransactionModule {}
