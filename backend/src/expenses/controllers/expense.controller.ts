import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from "@nestjs/common";
import { ExpenseService } from "../services/expense.service";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt_auth.guard";
import { Expense } from "../entities/expense.entity";
import { CreateExpenseDto } from "../dtos/createExpense.dto";
import { UpdateExpenseDto } from "../dtos/updateExpense.dto";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UserRole } from "src/common/enums/roles.enum";
import { Roles } from "src/common/decorators/roles.decorator";


@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpenseController{
    constructor(private readonly expenseService: ExpenseService) {}

    // Create Expense
    @Post()
    @UseGuards(RolesGuard)
    @Roles(UserRole.USER)
    async createExpense(@Body() createExpenseDto: CreateExpenseDto, @Req() req: Request){
        return this.expenseService.createExpense(createExpenseDto, req['user'].id);
    }

    // Update Expense
    @Put(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.USER)
    async updateExpense(@Param('id') id: number, @Body() updateExpenseDto: UpdateExpenseDto){
        return this.expenseService.updateExpense(updateExpenseDto, id);
    }
    
    // Delete Expense
    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.USER)
    async deleteExpense(@Param('id') id: number){
        return this.expenseService.deleteExpense(id);
    }
}