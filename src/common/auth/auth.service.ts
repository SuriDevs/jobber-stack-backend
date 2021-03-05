import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../../models/usuario/usuario.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUserByPassword(loginAttempt: LoginUsuarioDto) {
    // This will be used for the initial login
    const userToAttempt = await this.usuarioService.findOne(loginAttempt.email);

    if (!userToAttempt) {
      throw new HttpException(
        'E-mail ou senha não conferem',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return new Promise((resolve) => {
      // Check the supplied password against the hash stored for this email address
      // @ts-ignore
      userToAttempt.checkPassword(loginAttempt.senha, (err, isMatch) => {
        if (err) throw new UnauthorizedException();

        if (isMatch) {
          // If there is a successful match, generate a JWT for the user
          resolve(this.createJwtPayload(userToAttempt));
        } else {
          throw new UnauthorizedException();
        }
      });
    });
  }

  async validateUserByJwt(payload: IJwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.usuarioService.findOne(payload.email);

    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  createJwtPayload(user) {
    const data: IJwtPayload = {
      email: user.email,
    };

    const jwt = this.jwtService.sign(data);

    return {
      expiresIn: +process.env.JWT_EXPIRES,
      token: jwt,
      user: user,
    };
  }
}
