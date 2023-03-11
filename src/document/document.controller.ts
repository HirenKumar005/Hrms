import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/services/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/services/auth/guard/roles.guard';
import { storage } from 'src/services/multer';
import { Role } from 'src/utils/constants/roles';
import { DocumentService } from './document.service';
import { AddDocument } from './dto/addDocument.dto';
import { DeleteDocument } from './dto/deleteDocument.dto';

@Controller('api')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Roles(Role.HR, Role.Employee)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('addDocument')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('fileUpload', { storage: storage }))
  addDocument(
    @Body() dto: AddDocument,
    @UploadedFile() fileUpload: Express.Multer.File,
  ) {
    return this.documentService.addDocument(dto, fileUpload);
  }

  @Roles(Role.HR, Role.Employee)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('viewDocument/:id')
  @ApiParam({ example: 1, name: 'id', required: true })
  viewDocument(@Param('id') id: number) {
    return this.documentService.viewDocument(id);
  }

  @Roles(Role.HR, Role.Employee)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put('deleteDocument')
  deleteDocument(@Body() dto: DeleteDocument) {
    return this.documentService.deleteDocument(dto);
  }
}
