import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";
import { Category } from "src/common/enums/category.enum";
import { PaymentMethod } from "src/common/enums/paymentMethod.enum";

export class CreateExpenseDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    title: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsNotEmpty()
    @IsDate()
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