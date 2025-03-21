import { RegisterDto } from "../dtos/register.dto";
import * as bcrypt from 'bcrypt';
export class AuthService{
    constructor(){}

    async register(registerDto: RegisterDto): Promise<{ success: boolean; message: string; }>{
        try{
            // hashing the user password
            registerDto.password = await bcrypt.hash(registerDto.password, 10);
            return {
                success: true,
                message: 'User registered successfully'
            }
        }catch(error){

        }
    }
}