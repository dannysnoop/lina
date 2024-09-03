import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Transaction } from '../transaction/transaction.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn("increment")
  accountId: number;

  @Column()
  balance: number;

  @ManyToOne(() => Customer, (customer) => customer.accounts)
  customer: Customer;

  @OneToMany(() => Transaction, (transaction) => transaction.fromAccount)
  transactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.toAccount)
  receivedTransactions: Transaction[];
}
