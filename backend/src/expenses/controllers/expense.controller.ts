import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from "@nestjs/common";
import { ExpenseService } from "../services/expense.service";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt_auth.guard";
import { Expense } from "../entities/expense.entity";
import { CreateExpenseDto } from "../dtos/createExpense.dto";


@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpenseController{
    constructor(private readonly expenseService: ExpenseService) {}

    // Create Expense
    @Post()
    async createExpense(@Body() createExpenseDto: CreateExpenseDto, @Req() req: Request){
        createExpenseDto['user_id'] = { user_id: req['user'].id }; 
        return this.expenseService.createExpense(createExpenseDto);
    }
    
}