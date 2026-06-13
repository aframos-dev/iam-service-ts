import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { RequestWithUser } from './refresh-token.guard'
import { TokenService } from '../../iam/token.service'

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>()
    const cookies = request.cookies as Record<string, string | undefined>
    const accessToken = cookies.access_token

    if (!accessToken) throw new UnauthorizedException('Unauthorized')

    try {
      request.user = await this.tokenService.verifyAccessToken(accessToken)
      return true
    } catch {
      throw new UnauthorizedException('Unauthorized')
    }
  }
}
