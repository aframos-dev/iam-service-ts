import { Injectable, UnauthorizedException } from '@nestjs/common'
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
    const user = await this.userService.getByEmail(body.email)

    if (!user) throw new UnauthorizedException('Invalid credentials')

    const isPasswordValid = await this.hashService.compare(body.password, user.password)

    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials')

    const accessToken = 'access-token-example'
    const refreshToken = 'refresh-token-example'

    return {
      accessToken,
      refreshToken,
    }
  }
}
