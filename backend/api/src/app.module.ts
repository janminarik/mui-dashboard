import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Sprístupnenie premenných všade
  }),
    PrismaModule,
    CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
