import { Injectable } from "@nestjs/common";
import { ExpenseRepository } from "../repositories/expense.repository";
import { CreateExpenseDto } from "../dtos/createExpense.dto";

@Injectable()
export class ExpenseService{
    constructor (private readonly expenseRepository: ExpenseRepository){}

    async createExpense(createExpenseDto: CreateExpenseDto): Promise<{ success: boolean; message: string}>{
        try{
            await this.expenseRepository.createExpense(createExpenseDto);
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
}