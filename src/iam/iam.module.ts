import { Module } from '@nestjs/common'
import { IamController } from './iam.controller'
import { IamService } from './iam.service'
import { HashModule } from '../common/hash/hash.module'
import { UserModule } from '../user/user.module'

@Module({
  imports: [HashModule, UserModule],
  controllers: [IamController],
  providers: [IamService],
})
export class IamModule {}
