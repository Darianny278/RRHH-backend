import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dirname } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config/constants';
import { PuestoModule } from './puesto/puesto.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { CandidatoModule } from './candidato/candidato.module';
import { IdiomaModule } from './idioma/idioma.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { CapacitacionesModule } from './capacitaciones/capacitaciones.module';
import { CompetenciasController } from './competencias/competencias.controller';
import { CompetenciasService } from './competencias/competencias.service';
import { CompetenciasModule } from './competencias/competencias.module';
import { ExpLabModule } from './exp-lab/exp-lab.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'sqlite',
      host: configService.get<string>(DB_HOST),
      port: configService.get<number>(DB_PORT),
      username: configService.get<string>(DB_USER),
      password: configService.get<string>(DB_PASSWORD),
      database: configService.get<string>(DB_DATABASE),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    inject: [ConfigService],
  }),
  PuestoModule,
  AuthModule,
  UserModule,
  CandidatoModule,
  IdiomaModule,
  EmpleadoModule,
  CapacitacionesModule,
  CompetenciasModule,
  ExpLabModule,
],
  controllers: [AppController, CompetenciasController],
  providers: [AppService, CompetenciasService],
})
export class AppModule {}
