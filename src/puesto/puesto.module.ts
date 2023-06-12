import { Module, forwardRef } from '@nestjs/common';
import { PuestoService } from './puesto.service';
import { PuestoController } from './puesto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuestoEntity } from './puesto.entity';
import { CandidatoModule } from 'src/candidato/candidato.module';
import { PuestoRepository } from './puesto.repository';
import { CandidatoRepository } from 'src/candidato/candidato.repository';
import { CandidatoEntity } from 'src/candidato/candidato.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PuestoEntity]),
    forwardRef(() => CandidatoModule)
  ],
  providers: [PuestoService, CandidatoRepository],
  controllers: [PuestoController],
  exports: [TypeOrmModule]
})
export class PuestoModule {}
