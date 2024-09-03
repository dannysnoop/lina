import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateCustomerDto } from './DTO/create-customer.dto';
import { ICustomerService } from "./i.customer.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@Controller('customer')
@ApiTags('customer')
export class CustomerController {
  constructor(
    @Inject('ICustomerService')
    private readonly ICustomerService: ICustomerService,
  ) {}
  @Get('/:id')
  getCustomer(@Param('id') id: string) {
    return this.ICustomerService.getCustomer(id);
  }
  @Post()
  @ApiBody({ type: CreateCustomerDto })
  createCustomer(@Body() customer: CreateCustomerDto) {
    return this.ICustomerService.createCustomer(customer);
  }
}
