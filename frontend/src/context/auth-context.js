import { createContext } from 'react';

export const initialContext = {
    token: null,
    userId: null,
}

export const AuthContext = createContext(initialContext);

export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
