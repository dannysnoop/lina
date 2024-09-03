import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './account.service';
import { CustomersService } from '../customer/customer.service';
import { TransactionsService } from '../transaction/transaction.service';
import { Account } from './account.entity';
import { Customer } from '../customer/customer.entity';
import { Transaction } from '../transaction/transaction.entity';
import { CreateAccountDto } from './DTO/create-account.dto';
import { TransferDto } from './DTO/transfer.dto';
import { CreateCustomerDto } from '../customer/DTO/create-customer.dto';
import { dbConfig } from '../../database/config';
import { AccountModule } from './account.module';
import { CustomerModule } from '../customer/customer.module';
import { TransactionModule } from '../transaction/transaction.module';
import { AccountRepository } from './account.repository';
import { Repository } from 'typeorm';
import { TransactionRepository } from "../transaction/transaction.repository";
import { CustomerRepository } from "../customer/customer.repository";

describe('AccountsService', () => {
  let accountsService: AccountsService;
  let customersService: CustomersService;
  let transactionsService: TransactionsService;

  let accountRepository: Repository<Account>;
  let customerRepository: Repository<Customer>;
  let transactionRepository: Repository<Transaction>;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        dbConfig,
        AccountModule,
        CustomerModule,
        dbConfig,
        TransactionModule,
      ],
      providers: [
        AccountsService,
        CustomersService,
        TransactionsService,
        AccountRepository,
        TransactionRepository,
        CustomerRepository,
      ],
    }).compile();

    accountsService = module.get<AccountsService>(AccountsService);
    customersService = module.get<CustomersService>(CustomersService);
    transactionsService = module.get<TransactionsService>(TransactionsService);

    accountRepository = module.get<AccountRepository>(
      AccountRepository,
    );
    customerRepository = module.get<CustomerRepository>(
     CustomerRepository
    );
    transactionRepository = module.get<TransactionRepository>(
      TransactionRepository,
    );

    await transactionRepository.query('DELETE FROM transaction');
    await accountRepository.query('DELETE FROM account');
    await customerRepository.query('DELETE FROM customer');
  });


  it('create new bank account', async () => {
    const createCustomer: CreateCustomerDto = new CreateCustomerDto(
      'customer1',
      'Arisha Barron',
    );
    const createCustomer2: CreateCustomerDto = new CreateCustomerDto(
      'customer2',
      'Branden Gibson',
    );
    const createCustomer3: CreateCustomerDto = new CreateCustomerDto(
      'customer3',
      'Rhonda Church',
    );
    const createCustomer4: CreateCustomerDto = new CreateCustomerDto(
      'customer4',
      'Georgina Hazel',
    );
    await customersService.createCustomer(createCustomer);
    await customersService.createCustomer(createCustomer2);
    await customersService.createCustomer(createCustomer3);
    await customersService.createCustomer(createCustomer4);
    const createAcc = new CreateAccountDto('customer1', 1000);
    const createAcc2 = new CreateAccountDto('customer2', 500);
    const createAcc3 = new CreateAccountDto('customer3', 300);
    const createAcc4 = new CreateAccountDto('customer4', 200);
    const account = await accountsService.createAccount(createAcc);
    const account2 = await accountsService.createAccount(createAcc2);
    const account3 = await accountsService.createAccount(createAcc3);
    const account4 = await accountsService.createAccount(createAcc4);
    expect(account.balance).toBe(1000);
    expect(account.customer.customerId).toBe('customer1');
    expect(account2.balance).toBe(500);
    expect(account2.customer.customerId).toBe('customer2');
    expect(account3.balance).toBe(300);
    expect(account3.customer.customerId).toBe('customer3');
    expect(account4.balance).toBe(200);
    expect(account4.customer.customerId).toBe('customer4');
  });

  it('should transfer amount', async () => {
    const { accountId: account1 } = await accountsService.FindFirstAccountById(
      'customer1',
    );
    const { accountId: account2 } = await accountsService.FindFirstAccountById(
      'customer2',
    );
    const transfer: TransferDto = new TransferDto(account1, account2, 500);

    await accountsService.transferAmount(transfer);
    const updatedAccount1 = await accountsService.getBalance(account1);
    const updatedAccount2 = await accountsService.getBalance(account2);
    expect(updatedAccount1).toBe(500);
    expect(updatedAccount2).toBe(1000);
  });

  it('should record a transaction', async () => {
    const { accountId: account1 } = await accountsService.FindFirstAccountById(
      'customer1',
    );
    const { accountId: account2 } = await accountsService.FindFirstAccountById(
      'customer2',
    );
    const transfer: TransferDto = new TransferDto(account1, account2, 500);
    await accountsService.transferAmount(transfer);

    const transactions = await transactionsService.getTransferHistory(account1);
    expect(transactions.length).toBe(2);
    expect(transactions[0].amount).toBe(500);
    expect(transactions[0].fromAccount.accountId).toBe(account1);
    expect(transactions[0].toAccount.accountId).toBe(account2);
  });
  afterAll(async () => {
    await transactionRepository.query('DELETE FROM transaction');
    await accountRepository.query('DELETE FROM account');
    await customerRepository.query('DELETE FROM customer');
  });
});
