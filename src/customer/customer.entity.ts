import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Account } from '../account/account.entity';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Customer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  customerId: string;

  @Column()
  customerName: string;

  @OneToMany(() => Account, (account) => account.customer)
  accounts: Account[];

  @BeforeInsert()
  beforeInsert() {
    if (!this.customerId) {
      this.customerId = uuidv4();
    }
  }
}
