import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddProjectDto {
  @ApiProperty({ example: 1, type: "number", format: "number", required: true })
  @IsNumber()
  @IsNotEmpty()
  addedBy: number;

  @ApiProperty({
    example: "Job Portal",
    type: "string",
    format: "string",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @ApiProperty({
    example: "ABC",
    type: "string",
    format: "string",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: "1 month",
    type: "string",
    format: "string",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty({
    example: "NodeJs, VueJs",
    type: "string",
    format: "string",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  technologies: string;

  @ApiProperty({
    example: [1, 2],
    type: "array",
    format: "number",
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  assignTo: number[];
}
