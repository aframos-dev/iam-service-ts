import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { RegisterRequestDto } from './dto/register-request.dto'
import { IamService } from './iam.service'

@Controller('iam')
export class IamController {
  constructor(private readonly iamService: IamService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterRequestDto): Promise<{ ok: boolean }> {
    await this.iamService.register(body)

    return { ok: true }
  }
}
