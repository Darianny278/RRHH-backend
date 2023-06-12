import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdiomaEntity } from './idioma.entity';
import { IdiomaService } from './idioma.service';
import { IdiomaController } from './idioma.controller';

@Module({
    imports: [TypeOrmModule.forFeature([IdiomaEntity])],
    providers: [IdiomaService],
    controllers: [IdiomaController],
    exports: [TypeOrmModule]
})
export class IdiomaModule {}
