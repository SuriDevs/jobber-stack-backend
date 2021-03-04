import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/models/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import { from } from 'rxjs';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuarioService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usuarioService.findOne(email);
    if (user && _.isEqual(user.senha, password)) {
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  generateJwt(user: any) {
    return from(this.jwtService.signAsync({user}))
  }

  async hashPassword(password: string) {
    return from<string>(await bcrypt.hash(password, 12))
  }

  async login(user: any) {
    const payload = { email: user.username, sub: user.userId}
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
