import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/useDebounce";

const SearchFilter = ({ onChange, className, placeholder = "" }) => {
  const [value, setValue] = useState("");
  const lastValue = useDebounce(value);
  const searchRef = useRef();

  useEffect(() => {
    onChange(lastValue);
    // console.log(lastValue);
  }, [lastValue]);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <div className={`max-w-sm w-full ${className}`}>
      <Input
        ref={searchRef}
        onChange={(e) => setValue(e.target.value)}
        className="w-full"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchFilter;