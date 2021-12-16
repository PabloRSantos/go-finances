import React from "react";
import { TextInputProps } from "react-native";

import * as S from "./styles";

type Props = TextInputProps & {
  active?: boolean;
};

export const Input = ({ active = false, ...rest }: Props) => {
  return <S.Container {...rest} active={active} />;
};
