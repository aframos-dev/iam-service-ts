import { Exclude } from 'class-transformer'
import { User } from '@prisma/client'

export class UserEntity implements User {
  email!: string
  firstName!: string
  lastName!: string | null
  createdAt!: Date
  updatedAt!: Date

  @Exclude()
  password!: string

  @Exclude()
  id!: string

  constructor(partial: Partial<User>) {
    Object.assign(this, partial)
  }
}
