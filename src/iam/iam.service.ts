import { Injectable, UnauthorizedException } from '@nestjs/common'
import { RegisterRequestDto } from './dto/register-request.dto'
import { HashService } from '../common/hash/hash.service'
import { UserService } from '../user/user.service'
import { LoginRequestDto } from './dto/login-request.dto'
import { TokenService } from './token.service'

@Injectable()
export class IamService {
  constructor(
    private readonly hashService: HashService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
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

    return await this.tokenService.generateAuthTokens(user)
  }

  async refresh(userId: string): Promise<{
    accessToken: string
    refreshToken: string
  }> {
    const user = await this.userService.getById(userId)
    if (!user) throw new UnauthorizedException('Unauthorized')

    return this.tokenService.generateAuthTokens(user)
  }
}
