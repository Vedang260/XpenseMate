import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../common/enums/category.enum';

@Entity({ name: 'expenses'})
export class Expense{
    @PrimaryGeneratedColumn()
    id: number;

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

}