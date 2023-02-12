import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AppService } from './admin.service';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [AppService],
})
export class AppModule {}
