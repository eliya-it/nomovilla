import React, {
  createContext,
  useEffect,
  useReducer,
  ReactNode,
  FunctionComponent,
} from "react";
import useLocalStorage from "@hooks/useLocalStorage";

interface User {
  token?: string;
}
interface AuthState {
  user: User | null;
}
interface AuthAction {
  type: "LOGIN" | "SIGNUP" | "LOGOUT" | "DELETE" | "UPDATE";
  user?: User;
}
export interface AuthContextType {
  user: User | null; // Current authenticated user or null if not authenticated
  loading: boolean; // Indicates if the authentication state is being loaded
  dispatch: (obj: object) => void;
  login: (user: User) => void; // Function to log in a user
  logout: () => void; // Function to log out the user
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
    case "SIGNUP":
      return {
        user: action.user || null,
      };
    case "LOGOUT":
    case "DELETE":
      return {
        user: null,
      };
    case "UPDATE":
      return {
        user: action.user || state.user,
      };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FunctionComponent<
  AuthContextProviderProps
> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>("user");
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    if (user?.token) {
      dispatch({ type: "LOGIN", user });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
