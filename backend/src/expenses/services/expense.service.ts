import { Injectable, NotFoundException } from "@nestjs/common";
import { ExpenseRepository } from "../repositories/expense.repository";
import { CreateExpenseDto } from "../dtos/createExpense.dto";
import { UpdateExpenseDto } from "../dtos/updateExpense.dto";
import * as moment from 'moment';

@Injectable()
export class ExpenseService{
    constructor (private readonly expenseRepository: ExpenseRepository){}

    async createExpense(createExpenseDto: CreateExpenseDto, userId: number): Promise<{ success: boolean; message: string; expense: any}>{
        try{
            const expense = await this.expenseRepository.createExpense(createExpenseDto, userId);
            return{
                success: true,
                message: 'Expense is created successfully',
                expense:{
                    id: expense.id,
                    title: expense.title,
                    amount: expense.amount,
                    date: expense.date,
                    category: expense.category,
                    description: expense.description,
                    paymentMethod: expense.paymentMethod
                }
            }
        }catch(error){
            return{
                success: false,
                message: error.message,
                expense: null
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

    async getAllExpenses(user_id: number): Promise<{ success: boolean; message: string; expenses: any}>{
        try{
            const expenses = await this.expenseRepository.getAllExpenses(user_id);
            const sanitizedExpenses = expenses.map(({ user_id, ...rest }) => rest);
            return{
                success: true,
                message: 'All Expenses are retrieved successfully',
                expenses: sanitizedExpenses
            }
        }catch(error){
            return{
                success: false,
                message: error.message,
                expenses: null
            }
        }
    }

    async getExpenseAnalytics(userId: number): Promise<{ success: boolean; message: string; analytics: any}> {
        try {
          const today = moment().format('YYYY-MM-DD');
          const startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
          const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
          const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
    
          const dailyTotal = await this.expenseRepository.getTotalExpenseForPeriod(userId, today, today);
          const weeklyTotal = await this.expenseRepository.getTotalExpenseForPeriod(userId, startOfWeek, today);
          const monthlyTotal = await this.expenseRepository.getTotalExpenseForPeriod(userId, startOfMonth, today);
          const yearlyTotal = await this.expenseRepository.getTotalExpenseForPeriod(userId, startOfYear, today);
          
          const categoryTotals = await this.expenseRepository.getCategoryWiseTotal(userId);
          const weeklyExpenses = await this.expenseRepository.getWeeklyExpenses(userId);
          const yearlyExpenses = await this.expenseRepository.getYearlyExpenses(userId);
    
          return {
            success: true,
            message: 'Your Analytics is here',
            analytics: {
              dailyTotal,
              weeklyTotal,
              monthlyTotal,
              yearlyTotal,
              categoryTotals,
              weeklyExpenses,
              yearlyExpenses,
            },
          };
        } catch (error) {
            console.error('Error in retreiving analytics: ', error.message);
          return{
            success: false,
            message: 'Failed to retrieve anaytics',
            analytics: null
          }
        }
      }
}