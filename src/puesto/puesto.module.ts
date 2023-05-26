import { Module } from '@nestjs/common';
import { PuestoService } from './puesto.service';
import { PuestoController } from './puesto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuestoEntity } from './puesto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PuestoEntity])],
  providers: [PuestoService],
  controllers: [PuestoController]
})
export class PuestoModule {}
