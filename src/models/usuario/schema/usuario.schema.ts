import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TipoPerfil } from '../dto/create-usuario.dto';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop()
  nome: string;

  @Prop()
  sobrenome: string;

  @Prop()
  dataNascimento: string;

  @Prop()
  email: string;

  @Prop()
  senha: string;

  @Prop()
  tipoPerfil: TipoPerfil;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
