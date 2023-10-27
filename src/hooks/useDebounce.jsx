import { useEffect, useState } from "react";

export const useDebounce = (input) => {
  const [debounceTerm, setDebounceTerm] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceTerm(input);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return debounceTerm;
};
