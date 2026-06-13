import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator'
import { Transform } from 'class-transformer'

export class LoginRequestDto {
  @IsEmail()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  email!: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string
}
