import { Module } from '@nestjs/common';
import { AdminModule } from './Admin/adminmodule.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/usermodule.module';

@Module({
  imports: [UserModule,AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
