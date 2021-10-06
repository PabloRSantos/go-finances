import React from 'react';

import { TouchableOpacityProps } from 'react-native';
import * as S from './styles';

interface Props extends TouchableOpacityProps {
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
    <S.Container {...rest} isActive={isActive} type={type}>
      <S.Icon 
        type={type}
        name={icons[type]} />
      <S.Title>
        {title}
      </S.Title>
    </S.Container>
  );
};

