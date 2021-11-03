import React, { useState } from "react";
import * as S from "./styles";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { useTheme } from "styled-components/native";

export const SignIn: React.FC = () => {
  const theme = useTheme()
  const { signInWithGoogle, signInWithApple } = useAuth();
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true)
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel conectar a conta Google");
      setIsLoading(false)
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true)
      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel conectar a conta Apple");
      setIsLoading(false)
    }
  }

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <S.Title>
            Controle suas{"\n"}finanças de forma{"\n"}muito simples
          </S.Title>
        </S.TitleWrapper>
        <S.SignInTitle>
          Faça seu login com{"\n"}uma das contas abaixo
        </S.SignInTitle>
      </S.Header>

      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton
            onPress={handleSignInWithGoogle}
            svg={GoogleSvg}
            title="Entrar com Google"
          />

          {Platform.OS === 'ios' && (
            <SignInSocialButton
            onPress={handleSignInWithApple}
            svg={AppleSvg}
            title="Entrar com Apple"
            />
          )}
        </S.FooterWrapper>

        {isLoading && <ActivityIndicator style={{ marginTop: 18 }} size='small' color={theme.colors.shape} />}

      </S.Footer>
    </S.Container>
  );
};
