import { Module } from '@nestjs/common'
import { IamController } from './iam.controller'
import { IamService } from './iam.service'
import { HashModule } from '../common/hash/hash.module'
import { UserModule } from '../user/user.module'
import { CookieService } from './cookie.service'

@Module({
  imports: [HashModule, UserModule],
  controllers: [IamController],
  providers: [IamService, CookieService],
})
export class IamModule {}
