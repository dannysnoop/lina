import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomersService } from './customer.service';
import { CustomerRepository } from './customer.repository';
import { AccountsService } from '../account/account.service';
import { ICustomerService } from './i.customer.service';

@Module({
  controllers: [CustomerController],
  providers: [
    CustomersService,
    CustomerRepository,
    { provide: 'ICustomerService', useClass: CustomersService },
  ],
  exports: [CustomersService, CustomerRepository],
})
export class CustomerModule {}
