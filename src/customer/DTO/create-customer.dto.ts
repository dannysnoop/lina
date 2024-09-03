import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto {
  @ApiProperty()
  customerId: string;
  @ApiProperty()
  customerName: string;

  constructor(customerId: string, customerName: string) {
    this.customerName = customerName;
    this.customerId = customerId;
  }
}
