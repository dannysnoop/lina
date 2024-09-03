import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './DTO/create-customer.dto';
import { COMMON_MESSAGE } from '../../helper/const';
import { Account } from "../account/account.entity";

@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomerRepository) {}

  async createCustomer(customerCreate: CreateCustomerDto): Promise<Customer> {
    const { customerName, customerId } = customerCreate;
    try {
      const customer = this.customersRepository.create({
        customerId,
        customerName,
      });
      return this.customersRepository.save(customer);
    } catch (e) {
      throw new HttpException(COMMON_MESSAGE.DUPLICATE, HttpStatus.FORBIDDEN);
    }
  }

  async getCustomer(customerId: string): Promise<Customer> {
    return this.customersRepository.findOne({ where: { customerId } });
  }
  async getFirstCustomer(customerId: string): Promise<Account> {
    const customer =  await this.customersRepository.findOne({ where: { customerId }  , relations: ['accounts']});
    return customer.accounts.at(0);
  }
}
