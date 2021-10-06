import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import { useForm } from 'react-hook-form'

import * as S from './styles';

interface FormData {
  name: string;
  amount: string
}

export const Register = () => {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const { control, handleSubmit } = useForm()

  const handleTransactionsTypeSelect = (type: 'up' | 'down') => {
    setTransactionType(type)
  }

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false)
  }

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true)
  }

  const handleRegister = (form: FormData) => {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    }
  }

  return (
    <S.Container>
        <S.Header>
          <S.Title>Cadastro</S.Title>
        </S.Header>

      <S.Form>
        <S.Fields>
          <InputForm name="name" control={control} placeholder="Nome" />
          <InputForm name="amount" control={control} placeholder="Preço" />

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

        <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
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
