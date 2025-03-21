import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }
    
    async createUser(user: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create(user);
        return await this.save(newUser);
    }
}