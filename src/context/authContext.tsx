import {
  createContext,
  useEffect,
  useReducer,
  ReactNode,
  FunctionComponent,
  Dispatch,
} from "react";
import useLocalStorage from "@hooks/useLocalStorage";
import { useNavigate } from "react-router";

// User interface representing the authenticated user
interface User {
  name: string;
  email: string;
  uid: string;
  token: string;
  expiresIn?: number;
}

// AuthState interface representing the authentication state
interface AuthState {
  user: User | null;
}

// AuthAction interface representing possible actions for the reducer
interface AuthAction {
  type: "LOGIN" | "SIGNUP" | "LOGOUT" | "DELETE" | "UPDATE" | "ERROR";
  user?: User;
}

// AuthContextType interface defining the context's structure
export interface AuthContextType {
  user: User | null; // Current authenticated user or null if not authenticated
  loading: boolean; // Indicates if the authentication state is being loaded
  dispatch: Dispatch<AuthAction>; // Dispatch function for actions
  login: (user: User) => void; // Function to log in a user
  update: (user: User) => void; // Function to lupdate the user
  logout: () => void; // Function to log out the user
}

// Create the AuthContext with an undefined initial value
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Reducer function to manage authentication state
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
    case "SIGNUP":
      return { user: action.user || null };
    case "LOGOUT":
    case "DELETE":
      return { user: null };
    case "UPDATE":
      console.log(action.user);

      return { user: action.user || state.user };
    default:
      return state;
  }
};

// Props interface for the AuthContextProvider
interface AuthContextProviderProps {
  children: ReactNode;
}

// AuthContextProvider component
export const AuthContextProvider: FunctionComponent<
  AuthContextProviderProps
> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>("user");
  const [_, dispatch] = useReducer(authReducer, { user: null });
  const navigate = useNavigate();
  // Effect to handle user login based on local storage
  useEffect(() => {
    if (user?.token) {
      console.log("Logging user in from authContext...");
      dispatch({ type: "LOGIN", user });
    }
  }, [user?.token]);

  const login = (user: User) => {
    setUser(user);
    dispatch({ type: "LOGIN", user });
  };

  // Logout function to dispatch logout action
  const logout = () => {
    setUser(null);
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  const update = (user: User) => {
    setUser(user);
    dispatch({ type: "UPDATE", user });
  };

  // Provide context value to children components
  return (
    <AuthContext.Provider
      value={{ user, loading: false, dispatch, login, logout, update }}
    >
      {children}
    </AuthContext.Provider>
  );
};
