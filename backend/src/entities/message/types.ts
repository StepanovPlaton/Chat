import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMessageDTO {
  @ApiProperty()
  @IsNotEmpty()
  public timeOfSend: string;

  @ApiProperty()
  @IsNotEmpty()
  public sender: string;
}
