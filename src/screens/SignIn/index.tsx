import React from "react";
import * as S from "./styles";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import { Alert } from "react-native";

export const SignIn: React.FC = () => {
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel conectar a conta Google");
    }
  }

  async function handleSignInWithApple() {
    try {
      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel conectar a conta Apple");
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
          <SignInSocialButton
            onPress={handleSignInWithApple}
            svg={AppleSvg}
            title="Entrar com Apple"
          />
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  );
};
