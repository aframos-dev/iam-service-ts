import { Injectable } from '@nestjs/common'
import { RegisterRequestDto } from './dto/register-request.dto'
import { HashService } from '../common/hash/hash.service'
import { UserService } from '../user/user.service'

@Injectable()
export class IamService {
  constructor(
    private readonly hashService: HashService,
    private readonly userService: UserService,
  ) {}

  async register(body: RegisterRequestDto): Promise<void> {
    const passwordHash = await this.hashService.hash(body.password)

    await this.userService.create(body.email, passwordHash, body.firstName, body.lastName)
  }
}
