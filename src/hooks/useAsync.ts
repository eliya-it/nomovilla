import { useReducer } from "react";

// Define the shape of the state
interface AsyncState<T> {
  loading: boolean | null;
  error: string | null;
  data: T | null;
  extra: any | null;
  identifier: string | null;
  message: string | null;
}

// Define the shape of the action
interface AsyncAction<T> {
  type: "SEND" | "RESPONSE" | "ERROR" | "CLEAR";
  resData?: T; // Optional, used in RESPONSE action
  error?: string; // Optional, used in ERROR action
  message?: string; // Optional, used in RESPONSE action
}
// Define the initial state
const initialState: AsyncState<any> = {
  loading: null,
  error: null,
  data: null,
  extra: null,
  identifier: null,
  message: null,
};
// Define the reducer function
const reducer = <T>(
  state: AsyncState<T>,
  action: AsyncAction<T>
): AsyncState<T> => {
  switch (action.type) {
    case "SEND":
      return {
        ...state,
        loading: true,
        error: null,
        data: null,
      };
    case "RESPONSE":
      return {
        ...state,
        loading: false,
        data: action.resData || null,
        message: action.message || null,
      };
    case "ERROR":
      return {
        ...state,
        error: action.error || null,
        loading: false,
      };
    case "CLEAR":
      return initialState;
    default:
      return state; // Return the current state if the action type is unknown
  }
};
// Define the shape of the return value from the useAsync hook
interface UseAsyncReturn<T> {
  dispatch: React.Dispatch<AsyncAction<T>>;
  error: string | null;
  isLoading: boolean;
  message: string | null;
}

const useAsync = <T>(): UseAsyncReturn<T> => {
  const [res, dispatch] = useReducer(reducer, initialState);
  return {
    dispatch,
    error: res.error,
    isLoading: res.loading,
    message: res.message,
  };
};

export default useAsync;
