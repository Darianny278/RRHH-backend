import { Module, forwardRef } from '@nestjs/common';
import { CandidatoService } from './candidato.service';
import { CandidatoController } from './candidato.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatoEntity } from './candidato.entity';
import { PuestoModule } from 'src/puesto/puesto.module';
import { PuestoRepository } from 'src/puesto/puesto.repository';
import { PuestoEntity } from 'src/puesto/puesto.entity';
import { CapacitacionesModule } from 'src/capacitaciones/capacitaciones.module';
import { CompetenciasModule } from 'src/competencias/competencias.module';
import { IdiomaModule } from 'src/idioma/idioma.module';
import { ExpLabModule } from 'src/exp-lab/exp-lab.module';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CandidatoEntity]),
    forwardRef(() => PuestoModule),
    forwardRef(() => CapacitacionesModule),
    forwardRef(() => CompetenciasModule),
    forwardRef(() => IdiomaModule),
    forwardRef(() => ExpLabModule),
    forwardRef(() => UserModule),
  ],
  providers: [CandidatoService, PuestoRepository],
  controllers: [CandidatoController],
  exports: [TypeOrmModule]
})
export class CandidatoModule {}
