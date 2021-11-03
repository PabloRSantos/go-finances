import React, { createContext, useContext, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  userStorageLoading: boolean
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true)
  const userStorageKey = '@gofinances:user'

  useEffect(() => {
    async function loadUserStorageData(): Promise<void> {
      const userStorage = await AsyncStorage.getItem(userStorageKey)

      if(userStorage) {
        const userLogged = JSON.parse(userStorage) as User
        setUser(userLogged)
      }
      setUserStorageLoading(false)
    }

    loadUserStorageData()
  }, [])

  async function signInWithGoogle() {
    const RESPONSE_TYPE = "token";
    const SCOPE = encodeURI("profile email");
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    const { params, type } = (await AuthSession.startAsync({
      authUrl,
    })) as AuthorizationResponse;

    if (type === "success") {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
      );
      const userInfo = await response.json();
      
      const userLogged = {
        id: String(userInfo.id),
        email: userInfo.email,
        name: userInfo.given_name,
        photo: userInfo.picture,
      }
      setUser(userLogged);
      await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
    }
  }

  async function signInWithApple() {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (credential) {
      const name = credential.fullName!.givenName!
      const photo = `https://ui-avatars.com/api/?name=${name}&length=1`
      const userLogged = {
        id: String(credential.user),
        email: credential.email!,
        name,
        photo
      };

      setUser(userLogged)
      await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
    }
  }

  async function signOut() {
    setUser({} as User)
    await AsyncStorage.removeItem(userStorageKey)
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple, userStorageLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
