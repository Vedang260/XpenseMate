import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from "@nestjs/common";
import { ExpenseService } from "../services/expense.service";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt_auth.guard";
import { Expense } from "../entities/expense.entity";
import { CreateExpenseDto } from "../dtos/createExpense.dto";
import { UpdateExpenseDto } from "../dtos/updateExpense.dto";


@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpenseController{
    constructor(private readonly expenseService: ExpenseService) {}

    // Create Expense
    @Post()
    async createExpense(@Body() createExpenseDto: CreateExpenseDto, @Req() req: Request){
        return this.expenseService.createExpense(createExpenseDto, req['user'].id);
    }

    // Update Expense
    @Put(':id')
    async updateExpense(@Param('id') id: number, @Body() updateExpenseDto: UpdateExpenseDto){
        return this.expenseService.updateExpense(updateExpenseDto, id);
    }
    
    @Delete(':id')
    async deleteExpense(@Param('id') id: number){
        return this.expenseService.deleteExpense(id);
    }
}