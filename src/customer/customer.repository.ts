import { DataSource, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerRepository extends Repository<Customer> {
  constructor(private dataSource: DataSource) {
    super(Customer, dataSource.createEntityManager());
  }
}
