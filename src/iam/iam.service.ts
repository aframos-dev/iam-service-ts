import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegisterRequestDto } from './dto/register-request.dto';

@Injectable()
export class IamService {
  async register(body: RegisterRequestDto): Promise<void> {
    const passwordHash = body.password

    // Temporary implementation
    if (body.email !== 'root@root.com' || passwordHash !== 'root123456789')
      throw new InternalServerErrorException('Temporary authentication error')
  }
}
