import { useEffect, useState } from "react";

export const useDebounce = <T>(delay: number, value: T): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timeRef = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeRef);
    };
  }, [delay, value]);

  return debouncedValue;
};

export default useDebounce;
