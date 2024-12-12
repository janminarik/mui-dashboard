import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from '@prisma/client'; // Import modelu Customer z Prisma

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {

      return this.prisma.customer.create({ data: createCustomerDto });
      // const newCustomer = await this.prisma.customer.create({ data: createCustomerDto });

      // console.log(newCustomer);

      // return newCustomer;

    }
    catch (error) {
      throw error; // Prehoď iné chyby
    }
  }

  async findAll(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }

  //vola sa po create a nenajde lebo id je null
  async findOne(id: string): Promise<Customer | null> {


    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`find one  - Zákazník s ID ${id} nebol nájdený.`);
    }
    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    try {
      return await this.prisma.customer.update({
        where: { id },
        data: updateCustomerDto,
      });
    } catch (error) {
      if (error.code === 'P2025') { // Kontrola chybového kódu Prisma pre "Record not found"
        throw new NotFoundException(`update - Zákazník s ID ${id} nebol nájdený.`);
      }
      throw error; // Prehoď iné chyby
    }
  }

  async remove(id: string): Promise<Customer> {
    ///throw new NotFoundException(`delete - Zákazník s ID ${id} nebol nájdený.`)

    try {
      return await this.prisma.customer.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') { // Kontrola chybového kódu Prisma pre "Record not found"
        throw new NotFoundException(`Zákazník s ID ${id} nebol nájdený.`);
      }
      throw error; // Prehoď iné chyby
    }
  }
}