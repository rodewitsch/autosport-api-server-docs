import { ClassSerializerInterceptor, Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import Joi from 'joi';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import { SessionMiddleware } from '../../middlewares/session.middleware';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      validationSchema: Joi.object({
        LOG_ERROR_PATH: Joi.string(),
        LOG_INFO_PATH: Joi.string(),
        PORT: Joi.number(),
      }),
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transports: [
          new winston.transports.File({
            filename: configService.get('LOG_ERROR_PATH'),
            level: 'error',
            format: winston.format.combine(winston.format((info) => info.level === 'error' && info)()),
            maxsize: 104857600,
            maxFiles: 5,
          }),
          new winston.transports.File({
            filename: configService.get('LOG_INFO_PATH'),
            level: 'info',
            format: winston.format.combine(winston.format((info) => info.level === 'info' && info)()),
            maxsize: 104857600,
            maxFiles: 5,
          }),
        ],
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  exports: [JwtModule],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
