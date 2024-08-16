import { useCallback, useReducer } from "react";
import axios, { AxiosError } from "axios";

interface State<T = any> {
  loading: boolean | null;
  error: AxiosError | null;
  data: T | null;
  extra: any;
  identifier: string | null;
}
// Define the action types
type Action<T = any> =
  | { type: "SEND"; identifier: string | null }
  | { type: "RESPONSE"; resData: T; extra?: any }
  | { type: "ERROR"; error: AxiosError }
  | { type: "CLEAR" };
// Initial state
const initialState: State = {
  loading: null,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};
// Reducer function
const httpReducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case "RESPONSE":
      return {
        ...state,
        loading: false,
        data: action.resData,
        extra: action.extra || null,
      };
    case "ERROR":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case "CLEAR":
      return initialState;
    default:
      console.error("[-] Should not get here...");
      return state;
  }
};

const useHttp = <T = any>() => {
  const [httpState, dispatchHttp] = useReducer(httpReducer<T>, initialState);

  const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);

  const sendRequest = useCallback(
    async (
      url: string,
      method?: "GET" | "POST" | "PATCH" | "DELETE",
      body?: any,
      requestExtra?: any,
      requestId?: string
    ) => {
      try {
        dispatchHttp({ type: "SEND", identifier: requestId || null });
        const response = await axios(url, {
          method,
          data: body,
        });
        dispatchHttp({
          type: "RESPONSE",
          resData: response.data,
          extra: requestExtra,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          dispatchHttp({
            type: "ERROR",
            error,
          });
        } else {
          dispatchHttp({
            type: "ERROR",
            error: new AxiosError("An unexpected error occurred"),
          });
        }
      }
    },
    []
  );

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    requestExtra: httpState.extra,
    requestId: httpState.identifier,
    sendRequest,
    clear,
  };
};

export default useHttp;
