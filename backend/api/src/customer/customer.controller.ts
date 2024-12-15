import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, NotFoundException, Query, ParseIntPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, Prisma } from '@prisma/client'; // Import modelu Customer z Prisma



@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post()
  create(@Body(new ValidationPipe()) createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  async findAll(
    @Query('filter') filter?: string,
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
    @Query('orderBy') orderBy?: string
  ) {

    const parsedFilter: Prisma.CustomerWhereInput = filter ? JSON.parse(filter) : undefined;
    const parsedOrderBy: Prisma.CustomerOrderByWithRelationInput = orderBy ? JSON.parse(orderBy) : undefined;
    return this.customerService.queryAll(parsedFilter, skip, take, parsedOrderBy);
  }

  // @Get()
  // findAll() {
  //   console.log("fineAll");
  //   return this.customerService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.customerService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        // spracovanie NotFoundException, napriklad vrátenie custom respons-u
        return {
          statusCode: 404,
          message: error.message
        }
      }
      throw error
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}