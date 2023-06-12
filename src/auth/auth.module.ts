import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from 'src/users/user.service';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guards';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'laclavesecreta',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    AuthService, 
    UserService,  
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
],
  controllers: [AuthController],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}