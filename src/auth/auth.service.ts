import { Injectable, Dependencies, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/userDto';
import { UserService } from 'src/users/user.service';

@Injectable()
@Dependencies(UserService)
export class AuthService {
  constructor(
    private userService: UserService,
    @Inject(JwtService) 
    private jwtService: JwtService
  ) {
  }

  async signIn(email: string, pass: string) {
    const user = await this.userService.findOne(email)

    if(!user) {
      throw new Error('Usuario no encontrado');
    }
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
   
    const payload = { email: user.email, name: user.nombre, id: user.id };
    console.log(payload)

    return { 
      user,
      access_token: this.jwtService.sign(payload) }
  }
  

  async singUp(dto: UserDto) {
    try {
      await this.userService.create(dto)
    } catch(error) 
    {
      throw error
    }
  }
}