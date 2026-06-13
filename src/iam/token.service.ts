import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { User } from '@prisma/client'

@Injectable()
export class TokenService {
  private readonly accessToken: string
  private readonly refreshToken: string

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.accessToken = this.configService.getOrThrow<string>('JWT_ACCESS_SECRET')
    this.refreshToken = this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN')
  }

  async generateAuthTokens(user: User): Promise<{
    accessToken: string
    refreshToken: string
  }> {
    const payload = { sub: user.id }

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.accessToken,
      expiresIn: this.configService.getOrThrow<number>('JWT_ACCESS_EXPIRES_IN') / 1000,
    })

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.refreshToken,
      expiresIn: this.configService.getOrThrow<number>('JWT_REFRESH_EXPIRES_IN') / 1000,
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  async verifyAccessToken(token: string): Promise<{ sub: string }> {
    return this.jwtService.verifyAsync<{ sub: string }>(token, {
      secret: this.accessToken,
    })
  }

  async verifyRefreshToken(token: string): Promise<{ sub: string }> {
    return this.jwtService.verifyAsync<{ sub: string }>(token, {
      secret: this.refreshToken,
    })
  }
}
