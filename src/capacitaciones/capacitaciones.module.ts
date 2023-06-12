import { Module } from '@nestjs/common';
import { CapacitacionesService } from './capacitaciones.service';
import { CapacitacionesController } from './capacitaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapacitacionesEntity } from './capacitaciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CapacitacionesEntity])],
  providers: [CapacitacionesService],
  controllers: [CapacitacionesController],
  exports: [TypeOrmModule]
})
export class CapacitacionesModule {}
