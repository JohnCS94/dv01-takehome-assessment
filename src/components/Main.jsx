import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Chart from "./Chart";
import Filters from "./Filters";
import Table from "./Table";

import { useFilters } from "../hooks/useFilters";
import { getData } from "../request/api";

const Main = () => {
  const [aggregates, setAggregates] = useState([]);

  const { filters, setters, options, setOptions } = useFilters();

  const { data, isLoading, error, refetch } = useQuery({
    /**
     * Since we are dealing with financial data, using the most up to date info
     * is crucial. So every time a user filters information, instead of
     * filtering stale data, we refetch.
     */
    queryKey: [
      "data",
      filters.homeOwnership,
      filters.quarter,
      filters.year,
      filters.term,
    ],
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

    setOptions.setHomeOwnershipOptions(homeOwnershipSet);
    setOptions.setQuarterOptions(quarterSet);
    setOptions.setYearOptions(yearSet);
    setOptions.setTermOptions(termSet);
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const mapFilters = {
      homeOwnership: filters.homeOwnership,
      quarter: filters.quarter,
      year: filters.year,
      term: filters.term,
    };

    const map = {};

    const filteredData = data.filter((d) => {
      return Object.entries(mapFilters).every(([key, value]) => {
        return value === "" || d[key] === value;
      });
    });

    filteredData.forEach((fd) => {
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
  }, [
    data,
    filters.homeOwnership,
    filters.quarter,
    filters.year,
    filters.term,
  ]);

  return (
    <div className="container">
      <Filters
        filters={filters}
        setters={setters}
        options={options}
        refetch={refetch}
      />
      <div style={{ width: "100%" }}>
        <Table data={aggregates} isLoading={isLoading} error={error} />
        <Chart data={aggregates} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

export default Main;
