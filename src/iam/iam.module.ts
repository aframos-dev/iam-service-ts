import { Module } from '@nestjs/common'
import { IamController } from './iam.controller'
import { IamService } from './iam.service'
import { HashModule } from '../common/hash/hash.module'
import { UserModule } from '../user/user.module'
import { CookieService } from './cookie.service'
import { TokenService } from './token.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [HashModule, UserModule, JwtModule],
  controllers: [IamController],
  providers: [IamService, CookieService, TokenService],
})
export class IamModule {}
