import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './Admin/adminmodule.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './Customer/customermodule.module';
import { AdvisorModule } from './Financial Advisor/advisormodule.module';
import { UserModule } from './user/usermodule.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [UserModule,AdminModule,AdvisorModule, CustomerModule, TypeOrmModule.forRoot(
    {
    type: 'postgres',
    host: 'containers-us-west-151.railway.app',
    port: 5703,
    username: 'postgres',
    password: 'ItPwBWVUUWyyaag1EWSA',
    database: 'railway',
    autoLoadEntities: true,
    synchronize: true,
    }
  ),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', '../public'), // added ../ to get one folder back
    serveRoot: '/public/' //last slash was important
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}




// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// <<<<<<< HEAD
// import { UserModule } from './user/usermodule.module';

// @Module({
//   imports: [UserModule],
// =======

// import { AdminModule } from './admin/adminmodule.module';
// //import { ExampleModule } from './Example/admin.module';

// @Module({
//   imports: [AdminModule],
// >>>>>>> 568d600f6dbe0da1872fac5af3b6bf964b668da9
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
