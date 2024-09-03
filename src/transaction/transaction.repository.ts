import { DataSource, Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Injectable } from "@nestjs/common";

@Injectable()
export class TransactionRepository extends Repository<Transaction> {
  constructor(private dataSource: DataSource) {
    super(Transaction, dataSource.createEntityManager());
  }
}
