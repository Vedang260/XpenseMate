import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
    
    @Column({ default: 'user' })
    role: string;
}