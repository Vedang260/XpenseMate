import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { CreateUserDto } from '../dtos/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    // finds the user by email
    async findUserByEmail(email: string): Promise<User | null> {
      return this.userRepository.findOne({ where: { email } });
    }

    // creates new user 
    async createUser(createUserDto: CreateUserDto): Promise<User> {
      const user = this.userRepository.create(createUserDto);
      return this.userRepository.save(user);
    }

    // deletes a user
    async removeUser(id: number): Promise<boolean> {
        const result = await this.userRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }

    // get all users
    async findAll(): Promise<User[]> {
      try{
        return this.userRepository.find();
      }
      catch(error){
        throw error;
      }
    }
    
    // finds a particular User based on user_id
    async findOne(id: number): Promise<User | null> {
      return this.userRepository.findOne({ where: { id } });
    }
}