import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class ListOfProjectDto {
  @ApiProperty({
    example: 1,
    type: "number",
    format: "number",
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id: number;
}
