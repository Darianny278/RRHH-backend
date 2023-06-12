import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetenciasEntity } from './competencias.entity';
import { CompetenciasService } from './competencias.service';
import { CompetenciasController } from './competencias.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CompetenciasEntity])],
    providers: [CompetenciasService],
    controllers: [CompetenciasController],
    exports: [TypeOrmModule]
})
export class CompetenciasModule {}
