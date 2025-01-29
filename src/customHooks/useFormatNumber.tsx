import { useCallback } from "react";

const useFormatNumber = () => {
  return useCallback((num: number | undefined): string | undefined => {
    return num?.toLocaleString();
  }, []);
};

export default useFormatNumber;
