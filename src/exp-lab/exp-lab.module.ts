import { Module } from '@nestjs/common';
import { ExpLabService } from './exp-lab.service';
import { ExpLabController } from './exp-lab.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpLabEntity } from './exp-lab.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpLabEntity])],
  providers: [ExpLabService],
  controllers: [ExpLabController],
  exports: [TypeOrmModule]
})
export class ExpLabModule {}
