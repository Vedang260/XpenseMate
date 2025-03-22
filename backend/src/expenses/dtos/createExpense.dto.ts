import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";
import { Category } from "src/common/enums/category.enum";
import { PaymentMethod } from "src/common/enums/paymentMethod.enum";

export class CreateExpenseDto{

    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    title: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsNotEmpty()
    @IsDateString()
    date: Date;

    @IsNotEmpty()
    @IsEnum(Category)
    category: Category;

    @MaxLength(500)
    description?: string;

    @IsNotEmpty()
    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;
}