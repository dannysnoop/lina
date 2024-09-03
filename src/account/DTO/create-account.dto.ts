import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountDto {
  @ApiProperty()
  customerId: string;
  @ApiProperty()

  initialDeposit: number;

  constructor(customerId: string, initialDeposit: number) {
    this.customerId = customerId;
    this.initialDeposit = initialDeposit;
  }
}
