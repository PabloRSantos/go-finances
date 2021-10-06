import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

interface Props extends TouchableOpacityProps {
  title: string
  onPress: () => void
}

export const CategorySelectButton: React.FC<Props> = ({ title, onPress }) => {
  return (
    <S.Container onPress={onPress}>
      <S.Category>
          {title}
      </S.Category>
      <S.Icon name="chevron-down" />
    </S.Container>
  );
};

