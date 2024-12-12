import { IsString, IsNotEmpty, IsBoolean, IsDate, IsOptional } from "class-validator"
import { Transform } from 'class-transformer';

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsBoolean()
    @IsNotEmpty()
    isVerified: boolean;

    @IsDate()
    @IsOptional()
    @Transform(({ value }) => value ? new Date(value) : undefined)
    createdAt: Date;

    @IsDate()
    @IsOptional()
    @Transform(({ value }) => value ? new Date(value) : undefined)
    updatedAt: Date;
}
