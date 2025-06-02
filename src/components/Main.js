import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Chart from "./Chart";
import Filters from "./Filters";
import Table from "./Table";

import { getData } from "../request/api";

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
    <div className="container">
      <Filters
        homeOwnership={homeOwnership}
        homeOwnershipOptions={homeOwnershipOptions}
        setHomeOwnership={setHomeOwnership}
        quarter={quarter}
        quarterOptions={quarterOptions}
        setQuarter={setQuarter}
        year={year}
        yearOptions={yearOptions}
        setYear={setYear}
        term={term}
        termOptions={termOptions}
        setTerm={setTerm}
      />
      <div style={{ width: "100%" }}>
        <Table data={aggregates} />
        <Chart data={aggregates} />
      </div>
    </div>
  );
};

export default Main;
