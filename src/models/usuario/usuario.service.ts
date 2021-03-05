import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario, UsuarioDocument } from './schema/usuario.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const createdUsuario = new this.usuarioModel(createUsuarioDto);
    return createdUsuario.save();
  }

  findAll(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }

  findOne(email: string): Promise<Usuario> {
    // @ts-ignore
    return this.usuarioModel.findOne({ email: email }).exec();
  }

  //
  // update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
  //   return `This action updates a #${id} usuario`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} usuario`;
  // }
}
