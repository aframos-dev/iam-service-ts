import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { User } from '@prisma/client'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateAuthTokens(user: User): Promise<{
    accessToken: string
    refreshToken: string
  }> {
    const payload = { sub: user.id }

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.getOrThrow<number>('JWT_ACCESS_EXPIRES_IN') / 1000,
    })

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.getOrThrow<number>('JWT_REFRESH_EXPIRES_IN') / 1000,
    })

    return {
      accessToken,
      refreshToken,
    }
  }
}
