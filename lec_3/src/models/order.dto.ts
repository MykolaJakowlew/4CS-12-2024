import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  from: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  to: string;
}
