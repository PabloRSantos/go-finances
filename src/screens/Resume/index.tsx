import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ptBR } from "date-fns/locale";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { VictoryPie } from "victory-native";
import * as S from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { addMonths, format, subMonths } from "date-fns";
import { ActivityIndicator } from "react-native";
import { useAuth } from "../../hooks/auth";

interface TransactionData {
  type: "up" | "down";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export const Resume: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  function handleDateChange(action: "next" | "prev") {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    }
    if (action === "prev") {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true)
    const dataKey = `@gofinances:transactions_user:${user.id}`
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted: TransactionData[] = response
      ? JSON.parse(response)
      : [];

    const expensive = responseFormatted.filter(
      (expensive) =>
        expensive.type === "down" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensiveTotal = expensive.reduce((accumulator, expensive) => {
      return accumulator + Number(expensive.amount);
    }, 0);

    const totalByCategory: CategoryData[] = [];
    categories.forEach((category) => {
      let categorySum = 0;

      expensive.forEach((expensiveItem) => {
        if (expensiveItem.category === category.key) {
          categorySum += Number(expensiveItem.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensiveTotal) * 100).toFixed(0)}%`;

        totalByCategory.push({
          ...category,
          totalFormatted,
          total: categorySum,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo por categoria</S.Title>
      </S.Header>

      {isLoading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
      <S.Content
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <S.ChartContainer>
          <S.MonthSelect>
            <S.MonthSelectButton onPress={() => handleDateChange("prev")}>
              <S.MonthSelectIcon name="chevron-left" />
            </S.MonthSelectButton>

            <S.Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </S.Month>

            <S.MonthSelectButton onPress={() => handleDateChange("next")}>
              <S.MonthSelectIcon name="chevron-right" />
            </S.MonthSelectButton>
          </S.MonthSelect>
          <VictoryPie
            data={totalByCategories}
            x="percent"
            y="total"
            colorScale={totalByCategories.map((category) => category.color)}
            labelRadius={50}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",
                fill: theme.colors.shape,
              },
            }}
          />
        </S.ChartContainer>

        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
          />
        ))}
      </S.Content>
      )}
    </S.Container>
  );
};
