import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { AccountsService } from './account.service';
import { TransferDto } from './DTO/transfer.dto';
import { CreateAccountDto } from './DTO/create-account.dto';
import { IAccountService } from './i.account.service';
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateCustomerDto } from "../customer/DTO/create-customer.dto";

@Controller('accounts')
@ApiTags('accounts')
export class AccountsController {
  constructor(
    @Inject('IAccountsService')
    private readonly IAccountService: IAccountService,
  ) {}

  @Post('create')
  @ApiBody({ type: CreateAccountDto })
  createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.IAccountService.createAccount(createAccountDto);
  }

  @Post('transfer')
  @ApiBody({ type: TransferDto })
  async transferAmount(@Body() transferDto: TransferDto) {
    return this.IAccountService.transferAmount(transferDto);
  }

  @Get(':accountId/balance')
  @ApiQuery({ name: 'accountId', required: false, type: String })
  getBalance(@Param('accountId') accountId: string) {
    return this.IAccountService.getBalance(+accountId);
  }

  @Get(':accountId/history')
  @ApiQuery({ name: 'accountId', required: false, type: String })
  getTransferHistory(@Param('accountId') accountId: string) {
    return this.IAccountService.getTransferHistory(+accountId);
  }
}
