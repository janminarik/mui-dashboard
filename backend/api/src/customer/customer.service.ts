import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, Prisma } from '@prisma/client'; // Import modelu Customer z Prisma
import { Sleep } from 'src/utils/helpers';


@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.prisma.customer.create({ data: createCustomerDto });
  }

  //@Sleep(2000)
  async queryAll(
    filter?: Prisma.CustomerWhereInput,
    skip?: number,
    take?: number,
    orderBy?: Prisma.CustomerOrderByWithRelationInput
  ): Promise<{ items: Customer[]; totalCount: number }> {
    const [data, total] = await Promise.all([
      this.prisma.customer.findMany({
        where: filter,
        skip,
        take,
        orderBy,
      }),
      this.prisma.customer.count({ where: filter }),
    ]);
    return { items: data, totalCount: total };
  }


  async findAll(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }

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

  //@Sleep(2000)
  async remove(id: string): Promise<Customer> {
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