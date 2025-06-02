import React from "react";
import Select from "./Select";

const Filters = ({ filters, setters, options, refetch }) => {
  /**
   * Although passing a key like this is less intuitive than passing a function
   * in props, I think it still has a high level of readibility and makes
   * adding any additional filters in the future easier by not haveing to pass
   * down 3X props.
   */
  const handleChange = (key) => (e) => {
    setters[`set${key}`](e.target.value);
  };

  const handleReset = () => {
    setters.setHomeOwnership("");
    setters.setQuarter("");
    setters.setYear("");
    setters.setTerm("");
    refetch();
  };

  return (
    <div className="filters">
      <h1>Filters</h1>
      <div className="select-container">
        <Select
          testId="select-home-ownership"
          placeholder="Select Home Ownership"
          options={Array.from(options.homeOwnershipOptions)}
          value={filters.homeOwnership}
          onChange={handleChange("HomeOwnership")}
        />

        <Select
          testId="select-quarter"
          placeholder="Select Quarter"
          options={Array.from(options.quarterOptions).sort()}
          value={filters.quarter}
          onChange={handleChange("Quarter")}
        />
        <Select
          testId="select-year"
          placeholder="Select Year"
          options={Array.from(options.yearOptions).sort()}
          value={filters.year}
          onChange={handleChange("Year")}
        />
        <Select
          testId="select-term"
          placeholder="Select Term"
          options={Array.from(options.termOptions).sort()}
          value={filters.term}
          onChange={handleChange("Term")}
        />
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Filters;
