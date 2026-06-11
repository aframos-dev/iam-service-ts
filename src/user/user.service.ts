import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { DatabaseService } from '../database/database.service'
import { User, Prisma } from '@prisma/client'

@Injectable()
export class UserService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  async create(
    email: string,
    password: string,
    firstName: string,
    lastName?: string,
  ): Promise<User> {
    try {
      return await this.dataBaseService.user.create({
        data: {
          email,
          password,
          firstName,
          lastName,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already exists')
        }
      }

      throw new InternalServerErrorException('Error creating user')
    }
  }
}
