import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { ActivityIndicator } from 'react-native'
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import * as S from "./styles";
import { useTheme } from "styled-components/native";
import { useAuth } from "../../hooks/auth";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string
}

interface HighlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

export const Dashboard: React.FC = () => {
  const theme = useTheme()
  const { signOut, user } = useAuth()
  const [isLoading, setIsLoading] = useState(true);
  const [transactionsData, setTransactionData] = useState<DataListProps[]>();
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  function getLastTransactionDate(transactions: DataListProps[], type: 'up' | 'down') {
    const collectionFiltered = transactions
      .filter(transaction => transaction.type === type)

    if(!collectionFiltered.length) {
      return '0'
    }
      
    const transactionsDate = collectionFiltered
      .map(transaction => new Date(transaction.date).getTime())

    const lastTransaction = new Date(Math.max.apply(Math, transactionsDate))
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`
  }

  async function loadTransaction() {
    const dataKey = `@gofinances:transactions_user:${user.id}`
    const response = await AsyncStorage.getItem(dataKey);
    const transactions: DataListProps[] = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted = transactions.map(
      transaction => {
        if (transaction.type === "up") {
          entriesTotal += Number(transaction.amount);
        } else {
          expensiveTotal += Number(transaction.amount);
        }

        const amount = Number(transaction.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(transaction.date));

        return {
          ...transaction,
          amount,
          date,
        };
      }
    );
    setTransactionData(transactionsFormatted);

    
    const lastTransactionEntries = getLastTransactionDate(transactions, 'up')
    const lastTransactionExpensive = getLastTransactionDate(transactions, 'down')
    const totalInterval = lastTransactionExpensive === '0' ? 'Não há transações' : `1 a ${lastTransactionExpensive}`
    
    const total = entriesTotal - expensiveTotal;
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: lastTransactionEntries === '0' ? 'Não há transações' : `Última entrada dia ${lastTransactionEntries}`
      },
      expensive: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: lastTransactionExpensive === '0' ? 'Não há transações' : `Última entrada dia ${lastTransactionExpensive}`
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval
      },
    });
    setIsLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      loadTransaction();
    }, [])
  );

  return (
    <S.Container>
      {isLoading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
        <>
          <S.Header>
            <S.UserWrapper>
              <S.UserInfo>
                <S.Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <S.User>
                  <S.UserGreeting>Olá, </S.UserGreeting>
                  <S.UserName>{user.name}</S.UserName>
                </S.User>
              </S.UserInfo>

              <S.LogoutButton onPress={signOut}>
                <S.Icon name="power" />
              </S.LogoutButton>
            </S.UserWrapper>
          </S.Header>

          <S.HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highlightData.expensive.amount}
              lastTransaction={highlightData.expensive.lastTransaction}
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
              type="total"
            />
          </S.HighlightCards>
          <S.Transactions>
            <S.Title>Listagem</S.Title>
            <S.TransactionList
              data={transactionsData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </S.Transactions>
        </>
      )}
    </S.Container>
  );
};
