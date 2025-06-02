import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getData } from "../request/api";
import Table from "./Table";
import Chart from "./Chart";

const Main = () => {
  const [aggregates, setAggregates] = useState([]);
  const [homeOwnership, setHomeOwnership] = useState("");
  const [quarter, setQuarter] = useState("");
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");

  const [homeOwnershipOptions, setHomeOwnershipOptions] = useState(new Set());
  const [quarterOptions, setQuarterOptions] = useState(new Set());
  const [yearOptions, setYearOptions] = useState(new Set());
  const [termOptions, setTermOptions] = useState(new Set());

  const handleReset = () => {
    setHomeOwnership("");
    setQuarter("");
    setYear("");
    setTerm("");
  };

  const { data } = useQuery({
    queryKey: ["data", homeOwnership, quarter, year, term],
    queryFn: getData,
  });

  useEffect(() => {
    if (!data) return;

    const homeOwnershipSet = new Set();
    const quarterSet = new Set();
    const yearSet = new Set();
    const termSet = new Set();

    data.forEach((d) => {
      homeOwnershipSet.add(d.homeOwnership);
      quarterSet.add(d.quarter);
      yearSet.add(d.year);
      termSet.add(d.term);
    });

    setHomeOwnershipOptions(homeOwnershipSet);
    setQuarterOptions(quarterSet);
    setYearOptions(yearSet);
    setTermOptions(termSet);
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const filters = {
      homeOwnership,
      quarter,
      year,
      term,
    };

    const map = {};

    const filterData = data.filter((d) =>
      Object.entries(filters).every(
        ([key, value]) => d[key] === value || value === ""
      )
    );

    filterData.forEach((fd) => {
      if (!(fd.grade in map)) {
        map[fd.grade] = 0;
      }
      map[fd.grade] += Number(fd.currentBalance);
    });

    const chartData = Object.entries(map).map(([grade, currentBalance]) => ({
      grade,
      currentBalance,
    }));

    setAggregates(chartData);
  }, [data]);

  return (
    <div>
      <select
        value={homeOwnership}
        onChange={(e) => setHomeOwnership(e.target.value)}
      >
        <option value="" disabled>
          Select Ownership
        </option>
        {Array.from(homeOwnershipOptions).map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      <select value={quarter} onChange={(e) => setQuarter(e.target.value)}>
        <option value="" disabled>
          Select Quarter
        </option>
        {Array.from(quarterOptions)
          .sort()
          .map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="" disabled>
          Select Year
        </option>
        {Array.from(yearOptions)
          .sort()
          .map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
      <select value={term} onChange={(e) => setTerm(e.target.value)}>
        <option value="" disabled>
          Select Term
        </option>
        {Array.from(termOptions)
          .sort()
          .map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
      <button onClick={handleReset}>Reset</button>
      <Table data={aggregates} />
      <Chart data={aggregates} />
    </div>
  );
};

export default Main;
