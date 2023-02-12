import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
<<<<<<< HEAD
=======


// <<<<<<< HEAD
// import { Controller, Get } from '@nestjs/common';
// =======
// import { Controller, Get, Query } from '@nestjs/common';
// >>>>>>> 568d600f6dbe0da1872fac5af3b6bf964b668da9
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// <<<<<<< HEAD
// =======
 

// >>>>>>> 568d600f6dbe0da1872fac5af3b6bf964b668da9
// }



>>>>>>> 41471ffaa0b2f3eca4f26de71ed270e0f0d9294f
