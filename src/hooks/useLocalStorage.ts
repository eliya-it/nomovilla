import { useState } from "react";

const useLocalStorage = <T>(
  key: string,
  initialVal: T | null = null
): [T | null, (newVal: T) => void] => {
  const storedVal = JSON.parse(localStorage.getItem(key) as string);
  const [val, setVal] = useState<T | null>(storedVal || initialVal);

  const setNewVal = (newVal: T) => {
    setVal(newVal);
    localStorage.setItem(key, JSON.stringify(newVal));
  };

  return [val, setNewVal];
};

export default useLocalStorage;
