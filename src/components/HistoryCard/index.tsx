import React from 'react';
import * as S from './styles';

interface Props {
  title: string
  amount: string
  color: string
}

export const HistoryCard: React.FC<Props> = ({ title, amount, color }) => {
  return (
    <S.Container color={color}>
      <S.Title>{title}</S.Title>
      <S.Amount>{amount}</S.Amount>
    </S.Container>
  );
};

