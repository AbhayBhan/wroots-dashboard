import { useEffect, useState } from "react";

export const useDebounce = (input, delay = 1000) => {
  const [debounceTerm, setDebounceTerm] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceTerm(input);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return debounceTerm;
};
