import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}

  private get isProd(): boolean {
    return this.configService.getOrThrow('NODE_ENV') === 'production'
  }

  setAuthCookies(res: Response, accessToken: string, refreshToken: string): void {
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: this.isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: this.configService.getOrThrow<number>('JWT_ACCESS_EXPIRES_IN'),
    })

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.isProd,
      sameSite: 'lax',
      path: '/iam/refresh',
      maxAge: this.configService.getOrThrow<number>('JWT_REFRESH_EXPIRES_IN'),
    })
  }

  clearAuthCookies(res: Response) {
    res.clearCookie('access_token', {
      path: '/',
    })

    res.clearCookie('refresh_token', {
      path: '/iam/refresh',
    })
  }
}
