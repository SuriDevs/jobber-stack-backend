import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TipoPerfil } from '../dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';

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

UsuarioSchema.pre('save', function (next) {
  const user = this;
  // Make sure not to rehash the password if it is already hashed
  if (!user.isModified('senha')) return next();
  // Generate a salt and use it to hash the user's password
  bcrypt.genSalt(10, (err, salt) => {
    console.log(err);
    if (err) return next(err);

    // @ts-ignore
    bcrypt.hash(user.senha, salt, (err, hash) => {
      if (err) return next(err);
      // @ts-ignore
      user.senha = hash;
      next();
    });
  });
});

UsuarioSchema.methods.checkPassword = function (attempt, callback) {
  const user = this;

  // @ts-ignore
  bcrypt.compare(attempt, user.senha, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};
