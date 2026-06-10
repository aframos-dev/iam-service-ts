import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { RegisterRequestDto } from './dto/register-request.dto'
import { HashService } from '../common/hash/hash.service'

@Injectable()
export class IamService {
  constructor(private readonly hashService: HashService) {}

  async register(body: RegisterRequestDto): Promise<void> {
    const passwordHash = await this.hashService.hash(body.password)

    // Temporary implementation
    if (body.email !== 'root@root.com' || !passwordHash)
      throw new InternalServerErrorException('Temporary authentication error')
  }
}
