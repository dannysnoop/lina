import { CreateCustomerDto } from './DTO/create-customer.dto';
import { Customer } from './customer.entity';

export interface ICustomerService {
  createCustomer(customerCreate: CreateCustomerDto): Promise<Customer>;
  getCustomer(customerId: string): Promise<Customer>;
}
