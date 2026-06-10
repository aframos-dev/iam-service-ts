import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common'
import { RegisterRequestDto } from './dto/register-request.dto'

@Controller('iam')
export class IamController {
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterRequestDto): Promise<{ ok: boolean }> {
    // Temporary implementation
    if (body.email !== 'root@root.com' || body.password !== 'root123456789')
      throw new InternalServerErrorException('Temporary authentication error')

    return { ok: true }
  }
}
