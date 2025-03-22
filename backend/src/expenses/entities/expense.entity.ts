import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../common/enums/category.enum';
import { PaymentMethod } from '../../common/enums/paymentMethod.enum';
import { User } from 'src/users/entities/users.entity';

@Entity({ name: 'expenses'})
export class Expense{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({ length: 100})
    title: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'enum', enum: Category})
    category: Category;

    @Column({ length: 500, nullable: true })
    description?: string;
    
    @Column({ type: 'enum', enum: PaymentMethod })
    paymentMethod: PaymentMethod;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
    user: User;
}