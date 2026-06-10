import { Module } from '@nestjs/common'
import { IamController } from './iam.controller'
import { IamService } from './iam.service'
import { HashModule } from '../common/hash/hash.module'

@Module({
  imports: [HashModule],
  controllers: [IamController],
  providers: [IamService],
})
export class IamModule {}
