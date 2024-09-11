import { useCallback, useReducer } from "react";
import axios from "axios";

interface State<T = any> {
  loading: boolean | null;
  error: string | null; // Change to a string to hold standardized error messages
  data: T | null;
  extra: any;
  identifier: string | null;
}

type Action<T = any> =
  | { type: "SEND"; identifier: string | null }
  | { type: "RESPONSE"; resData: T; extra?: any }
  | { type: "ERROR"; error: string } // Change to string
  | { type: "CLEAR" };

const initialState: State = {
  loading: null,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

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
        error: action.error, // Store the standardized error message
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
        let errorMessage = "An unexpected error occurred."; // Default message
        if (axios.isAxiosError(error) && error.response) {
          errorMessage = error.response.data?.error || errorMessage; // Adjust this based on your API's error structure
        }
        dispatchHttp({
          type: "ERROR",
          error: errorMessage, // Dispatch the standardized error message
        });
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
