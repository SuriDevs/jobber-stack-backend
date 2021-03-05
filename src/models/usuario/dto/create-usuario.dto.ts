import { Type } from '@nestjs/common';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum TipoPerfil {
  candidato = 'candidato',
  recrutador = 'recrutador',
}

export class CreateUsuarioDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  sobrenome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  dataNascimento: string;

  @IsString()
  senha: string;

  @IsEnum(TipoPerfil, { each: true })
  tipoPerfil: TipoPerfil;
}
