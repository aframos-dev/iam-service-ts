import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import type { Request } from 'express'

export type RequestWithUser = Request & {
  user?: {
    sub: string
  }
}

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>()
    const cookies = request.cookies as Record<string, string>

    const refreshToken = cookies.refresh_token
    if (!refreshToken) throw new UnauthorizedException('Unauthorized')

    try {
      request.user = await this.jwtService.verifyAsync<{ sub: string }>(refreshToken, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      })

      return true
    } catch {
      throw new UnauthorizedException('Unauthorized')
    }
  }
}
