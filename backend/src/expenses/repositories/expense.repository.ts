import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Expense } from "../entities/expense.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ExpenseRepository{
    constructor(
        @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>,
    ) {}

    async getExpenseById(id: number): Promise<Expense | null> {
        try{
            const expense = await this.expenseRepository.findOne({ where: { id } });
            return expense;
        }catch(error){
            console.error('Error in retrieving expense: ', error.message);
            throw new InternalServerErrorException('Error retrieving expense');
        }
    }

    async getAllExpenses(user_id: number): Promise<Expense[]>{
        try{
            const expenses = this.expenseRepository.find({ where: { user_id }});
            return expenses;
        }catch(error){
            console.error('Error in retrieving all Expense: ', error.message);
            throw new InternalServerErrorException('Error in retrieving Expenses');   
        }
    }
    async createExpense(expenseData: Partial<Expense>, user_id: number): Promise<Expense> {
        try{
            const expense = this.expenseRepository.create(expenseData);
            return await this.expenseRepository.save({...expense, user_id });
        }catch(error){
            console.error('Error in creating a new Expense: ', error.message);
            throw new InternalServerErrorException('Error in creating Expense');
        }
    }

    async updateExpense(id: number, updatedData: Partial<Expense>): Promise<Expense | null> {
        try{
            await this.expenseRepository.update(id, updatedData);
            return this.getExpenseById(id);
        }catch(error){
            console.error('Error in updating expense: ', error.message);
            throw new InternalServerErrorException('Error in updating expense');
        }
    }

    async deleteExpense(id: number): Promise<boolean>{
        try{
            const result = await this.expenseRepository.delete(id);
            return result.affected === 1;
        }catch(error){
            console.error('Error in deleting an expense: ', error.message);
            throw new InternalServerErrorException('Error in deleting expense');
        }
    }
}