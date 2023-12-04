import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
 import { jwtConstants } from './constants';
 import { JwtStrategy } from './jwt.strategy';
 import { RolesGuard } from './role/roles.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '9999h' },
    }),
    forwardRef(() => UsersModule)/*UsersModule*/, 
    PassportModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AuthService, LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
