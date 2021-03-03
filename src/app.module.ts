import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/config/mongoose.config';
import { UsuarioModule } from './models/usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService, MongooseConfigService],
})
export class AppModule {}
