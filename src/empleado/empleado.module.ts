import { Module } from '@nestjs/common';
import { EmpleadoEntity } from './empleado.entity';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([EmpleadoEntity])],
    providers: [EmpleadoService],
    controllers: [EmpleadoController]
})
export class EmpleadoModule {}
