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

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

export const Dashboard: React.FC = () => {
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransaction] = useState<DataListProps[]>();
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  async function loadTransaction() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (transaction: DataListProps) => {
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

    const total = entriesTotal - expensiveTotal;
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expensive: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
    });
    setTransaction(transactionsFormatted);
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
                    uri: "https://avatars.githubusercontent.com/u/64219605?v=4",
                  }}
                />
                <S.User>
                  <S.UserGreeting>Olá, </S.UserGreeting>
                  <S.UserName>Rodrigo</S.UserName>
                </S.User>
              </S.UserInfo>

              <S.LogoutButton onPress={() => {}}>
                <S.Icon name="power" />
              </S.LogoutButton>
            </S.UserWrapper>
          </S.Header>

          <S.HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction="Última entrada dia 13 de abril"
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highlightData.expensive.amount}
              lastTransaction="Última entrada dia 13 de abril"
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction="Última entrada dia 13 de abril"
              type="total"
            />
          </S.HighlightCards>
          <S.Transactions>
            <S.Title>Listagem</S.Title>
            <S.TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </S.Transactions>
        </>
      )}
    </S.Container>
  );
};
