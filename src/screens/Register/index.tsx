import React, { useState } from 'react';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import * as S from './styles';

export const Register = () => {
  const [transactionType, setTransactionType] = useState('')

  const handleTransactionsTypeSelect = (type: 'up' | 'down') => {
    setTransactionType(type)
  }

  return (
    <S.Container>
        <S.Header>
          <S.Title>Cadastro</S.Title>
        </S.Header>

      <S.Form>
        <S.Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <S.TransactionsTypes>
          <TransactionTypeButton 
            isActive={transactionType === 'up'}
            onPress={() => handleTransactionsTypeSelect('up')}
            type="up"
            title="Income" />
          <TransactionTypeButton
            isActive={transactionType === 'down'}
            onPress={() => handleTransactionsTypeSelect('down')}
            type="down"
            title="Outcome" />
          </S.TransactionsTypes>
        </S.Fields>
        <Button title="Enviar" />
      </S.Form>
    </S.Container>
  );
};
