import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { CustomerModule } from './customer/customer.module';

import { TransactionModule } from './transaction/transaction.module';
import { dbConfig } from '../database/config';

@Module({
  imports: [AccountModule, CustomerModule, dbConfig, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
