import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { AuthService } from './auth/auth.service';
// import { LocalAuthGuard } from './auth/guards/local.guard';

//hi

@Controller()
export class AppController {
  constructor(private appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
//можно прописать маршрут входа, но нужно ли нам это в рамках курса или лучше не трогать контроллеры?
// @UseGuards(AuthGuard('LocalAuthGuard'))
// @Post('auth/login')
// async login(@Request() req) {
//   return req.user;

// @UseGuards(JwtAuthGuard)
// @Get('profile')
// getProfile(@Request() req) {
//   return req.user;
// }
