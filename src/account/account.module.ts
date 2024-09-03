import { forwardRef, Module } from '@nestjs/common';
import { AccountsController } from './account.controller';
import { AccountsService } from './account.service';
import { IAccountService } from './i.account.service';
import { TransactionModule } from '../transaction/transaction.module';
import { CustomerModule } from '../customer/customer.module';
import { AccountRepository } from './account.repository';

@Module({
  imports: [
    forwardRef(() => TransactionModule),
    forwardRef(() => CustomerModule),
  ],
  controllers: [AccountsController],
  providers: [AccountsService, AccountRepository ,
    { provide: 'IAccountsService', useClass: AccountsService },
  ],
})
export class AccountModule {}
