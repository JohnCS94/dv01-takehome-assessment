import { useState } from "react";

/**
 * Opted to use a custom hook to keep all of the filter related state i one
 * place as well as not wanting to pass 12 props to the Filter function.
 */
export const useFilters = () => {
  const [homeOwnership, setHomeOwnership] = useState("");
  const [quarter, setQuarter] = useState("");
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");

  const [homeOwnershipOptions, setHomeOwnershipOptions] = useState(new Set());
  const [quarterOptions, setQuarterOptions] = useState(new Set());
  const [yearOptions, setYearOptions] = useState(new Set());
  const [termOptions, setTermOptions] = useState(new Set());

  return {
    filters: { homeOwnership, quarter, year, term },
    setters: { setHomeOwnership, setQuarter, setYear, setTerm },
    options: { homeOwnershipOptions, quarterOptions, yearOptions, termOptions },
    setOptions: {
      setHomeOwnershipOptions,
      setQuarterOptions,
      setYearOptions,
      setTermOptions,
    },
  };
};
