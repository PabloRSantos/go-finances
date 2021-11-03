import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/global/styles/theme";
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { AppRoutes } from "./src/routes/app.routes";
import { StatusBar } from 'react-native';
import { SignIn } from './src/screens/SignIn';
import { AuthProvider } from './src/hooks/auth';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <AuthProvider>
         <Routes />
        </AuthProvider>
    </ThemeProvider>
  );
}
