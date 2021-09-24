import React from 'react';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';


import * as S from './styles';

export const Register = () => {
  return (
    <S.Container>
        <S.Header>
          <S.Title>Cadastro</S.Title>
        </S.Header>

      <S.Form>
        <S.Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
        </S.Fields>
        <Button title="Enviar" />
      </S.Form>
    </S.Container>
  );
};
