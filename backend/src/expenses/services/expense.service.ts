import { Injectable, NotFoundException } from "@nestjs/common";
import { ExpenseRepository } from "../repositories/expense.repository";
import { CreateExpenseDto } from "../dtos/createExpense.dto";
import { UpdateExpenseDto } from "../dtos/updateExpense.dto";

@Injectable()
export class ExpenseService{
    constructor (private readonly expenseRepository: ExpenseRepository){}

    async createExpense(createExpenseDto: CreateExpenseDto, userId: number): Promise<{ success: boolean; message: string}>{
        try{
            await this.expenseRepository.createExpense(createExpenseDto, userId);
            return{
                success: true,
                message: 'Expense is created successfully'
            }
        }catch(error){
            return{
                success: false,
                message: error.message
            }
        }
    }

    async updateExpense(updateExpenseDto: UpdateExpenseDto, id:number): Promise<{ success: boolean; message: string }>{
        try{
            const existingExpense = await this.expenseRepository.getExpenseById(id);
            if(!existingExpense){
                throw new NotFoundException('Expense is not found');
            }
            await this.expenseRepository.updateExpense(id, updateExpenseDto);
            return {
                success: true,
                message: 'Expense is updated successfully'
            }
        }catch(error){
            return {
                success: false,
                message: error.message
            }
        }
    }

    async deleteExpense(id: number): Promise<{ success: boolean; message: string}>{
        try{
            await this.expenseRepository.deleteExpense(id);
            return{
                success: true,
                message: 'Expense is deleted successfully'
            }
        }catch(error){
            return{
                success: false,
                message: error.message
            }
        }
    }
}