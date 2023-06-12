import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/userDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: UserRepository
  ){}

  
  async getAll(): Promise<UserEntity[]> {
    const list = await this.userRepository.find()

    if (!list.length) {
        throw new NotFoundException({ message: 'No hay user, la lista esta vacia' })
    }

    return list
}

  async findById(id: number) {
    const user = this.userRepository.findOne({ where: {id: id}, relations:['candidato'] });
    if (!user) {
      throw new NotFoundException({ message: 'Usuario no existente' })
  }

  return user
  }

  async findOne(email: string) {
    return this.userRepository.findOneBy({ email: email });
  }

  async create(dto: UserDto): Promise<any> {
    const user = this.userRepository.create(dto)

    await this.userRepository.save(user)

    return { message: 'Usuario creado' }
}
}