import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity({ name: 'user' })
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
    
    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;
}