import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../src/account/account.entity';
import { Customer } from '../src/customer/customer.entity';
import { Transaction } from '../src/transaction/transaction.entity';

export const dbConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: '119.17.223.226',
  port: 3306,
  username: 'root',
  password: 'dabeeovina@#0717',
  database: 'linagora',
  entities: [Account, Customer, Transaction],
  synchronize: true,
});
