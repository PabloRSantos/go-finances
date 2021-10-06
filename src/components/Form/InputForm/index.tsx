import React from 'react';
import { TextInputProps } from 'react-native';
import { Input } from '../Input';
import { Control, Controller } from 'react-hook-form'

import * as S from './styles';

interface Props extends TextInputProps {
  control: Control
  name: string
  error: string
}

export const InputForm: React.FC<Props> = ({ control, name, error, ...rest }) => {
  return (
    <S.Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input 
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
        name={name}
      />
      {error && <S.Error>{ error }</S.Error>}
    </S.Container>
  );
};

