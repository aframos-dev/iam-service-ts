import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { RegisterRequestDto } from './dto/register-request.dto'
import { HashService } from '../common/hash/hash.service'
import { UserService } from '../user/user.service'
import { LoginRequestDto } from './dto/login-request.dto'

@Injectable()
export class IamService {
  constructor(
    private readonly hashService: HashService,
    private readonly userService: UserService,
  ) {}

  async register(body: RegisterRequestDto): Promise<void> {
    const passwordHash = await this.hashService.hash(body.password)
    await this.userService.create(body.email, passwordHash, body.firstName, body.lastName)
  }

  async login(body: LoginRequestDto): Promise<{
    accessToken: string
    refreshToken: string
  }> {
    if (body.email !== 'root@root.com' || body.password !== 'root123456789')
      throw new InternalServerErrorException('Temporary authentication error')

    const accessToken = 'access-token-example'
    const refreshToken = 'refresh-token-example'

    return {
      accessToken,
      refreshToken,
    }
  }
}
