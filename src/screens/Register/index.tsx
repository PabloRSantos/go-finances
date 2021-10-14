import React, { useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import * as S from './styles';

interface FormData {
  name: string;
  amount: string
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
}).required()

export const Register = () => {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

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
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transição')
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
          <S.Header>
            <S.Title>Cadastro</S.Title>
          </S.Header>

        <S.Form>
          <S.Fields>
            <InputForm 
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm 
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

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
    </TouchableWithoutFeedback>
  );
};
