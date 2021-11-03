import React, { createContext, useContext, useState } from "react";
import * as AuthSession from "expo-auth-session";

interface AuthorizationResponse {
    params: {
        access_token: string
    }
    type: string
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
const [user, setUser] = useState<User>({} as User)

  async function signInWithGoogle() {
    const CLIENT_ID = "787992196104-1vkbm8ul7gcob5trf70ra13c57uirid1.apps.googleusercontent.com";
    const REDIRECT_URI = "https://auth.expo.io/@pablorsantos/gofinances";
    const RESPONSE_TYPE = "token";
    const SCOPE = encodeURI("profile email");
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    const { params, type } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

    if(type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
        const userInfo = await response.json()
        setUser({
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.giver_name,
            photo: userInfo.picture
        })
    }
}

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
