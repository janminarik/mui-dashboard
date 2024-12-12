import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Voliteľné, ale odporúčané pre jednoduchšie použitie
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule { }