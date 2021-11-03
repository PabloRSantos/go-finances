import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from '../hooks/auth';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import AppLoading from 'expo-app-loading';

export const Routes = () => {
    const { user, userStorageLoading } = useAuth()

    userStorageLoading && <AppLoading />

    return (
        <NavigationContainer>
            {user?.id ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    )
}