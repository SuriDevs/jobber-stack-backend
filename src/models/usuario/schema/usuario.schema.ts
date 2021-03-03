import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop()
  nome: string;

  @Prop()
  sobrenome: string;

  @Prop()
  dataNascimento: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
