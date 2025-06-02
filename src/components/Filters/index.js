import React from "react";
import Select from "./Select";

const Filters = ({
  homeOwnership,
  homeOwnershipOptions,
  setHomeOwnership,
  quarter,
  quarterOptions,
  setQuarter,
  year,
  yearOptions,
  setYear,
  term,
  termOptions,
  setTerm,
}) => {
  const handleHomeOwnershipChange = (e) => {
    setHomeOwnership(e.target.value);
  };

  const handleQuarterChange = (e) => {
    setQuarter(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleTermChange = (e) => {
    setTerm(e.target.value);
  };

  const handleReset = () => {
    setHomeOwnership("");
    setQuarter("");
    setYear("");
    setTerm("");
  };

  return (
    <div className="filters">
      <h1>Filters</h1>
      <div className="select-container">
        <Select
          placeholder="Select Home Ownership"
          options={Array.from(homeOwnershipOptions)}
          value={homeOwnership}
          onChange={handleHomeOwnershipChange}
        />

        <Select
          placeholder="Select Quarter"
          options={Array.from(quarterOptions).sort()}
          value={quarter}
          onChange={handleQuarterChange}
        />
        <Select
          placeholder="Select Year"
          options={Array.from(yearOptions).sort()}
          value={year}
          onChange={handleYearChange}
        />
        <Select
          placeholder="Select Term"
          options={Array.from(termOptions).sort()}
          value={term}
          onChange={handleTermChange}
        />
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Filters;
