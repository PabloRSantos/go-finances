import React, { createContext, useContext } from "react";

interface User {
    id: string
    name: string
    email: string
    photo?: string
}

interface IAuthContextData {
    user: User
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData );

export const AuthProvider: React.FC = ({ children }) => {
  const user = {
      id: '123',
      name: 'Pablo',
      email: 'pablo@mail.com'
  }

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext)

    return context
}
