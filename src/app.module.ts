import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/type-orm.config';
import { LibraryModule } from './features/library/library.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './core/guards/roles.guard';
import { AuthenticationModule } from './features/authentication/authentication.module';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { NewsModule } from './features/news/news.module';
import { CommonModule } from '@/features/common/common.module';
import { CoursesModule } from '@/features/courses/courses.module';
import { jwtModuleConfig } from '@/configs/jwt-module.config';
import { JwtModule } from '@nestjs/jwt';
import { ChatModule } from '@/features/chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from '@/configs/env.config';
import { CqrsModule } from '@nestjs/cqrs';
import { ReportModule } from './features/reports/report.module';


@Module({
  providers: [
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  imports: [
    CqrsModule.forRoot(),
    JwtModule.register(jwtModuleConfig),
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot(configModuleOptions),
    AuthenticationModule,
    CoursesModule,
    LibraryModule,
    NewsModule,
    CommonModule,
    ChatModule,
    ReportModule
  ],
})
export class AppModule {
}
