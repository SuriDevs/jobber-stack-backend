import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUsuarioDto) {
    return await this.authService.validateUserByPassword(loginUserDto);
  }
}
