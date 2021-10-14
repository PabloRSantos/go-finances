import React from 'react';

import { RectButtonProps } from 'react-native-gesture-handler';
import * as S from './styles';

interface Props extends RectButtonProps {
  title: string
  type: 'up' | 'down'
  isActive: boolean
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

export const TransactionTypeButton: React.FC<Props> = ({ title, type, isActive, ...rest }) => {
  return (
    <S.Container isActive={isActive} type={type}>
      <S.Button {...rest}>
        <S.Icon 
          type={type}
          name={icons[type]} />
        <S.Title>
          {title}
        </S.Title>
      </S.Button>
    </S.Container>
  );
};

