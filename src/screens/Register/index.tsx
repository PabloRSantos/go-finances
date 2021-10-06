import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';

import * as S from './styles';

export const Register = () => {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const handleTransactionsTypeSelect = (type: 'up' | 'down') => {
    setTransactionType(type)
  }

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false)
  }

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true)
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
          <CategorySelectButton
            onPress={handleOpenSelectCategoryModal}
            title={category.name}
          />
        </S.Fields>
        <Button title="Enviar" />
      </S.Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </S.Container>
  );
};
