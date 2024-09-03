import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Account } from '../account/account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => Account, (account) => account.transactions)
  fromAccount: Account;

  @ManyToOne(() => Account, (account) => account.receivedTransactions)
  toAccount: Account;

  @Column()
  amount: number;

  @CreateDateColumn()
  date: Date;
}
