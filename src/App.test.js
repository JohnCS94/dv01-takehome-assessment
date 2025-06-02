import React from "react";
import { useQuery } from "@tanstack/react-query";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import Main from "./components/Main";

jest.mock("@tanstack/react-query");

// Surpressing warnings from Responsive Chart container width and height
jest.mock("recharts", () => {
  const Original = jest.requireActual("recharts");

  return {
    ...Original,
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
  };
});

const mockData = [
  {
    homeOwnership: "OWN",
    quarter: "1",
    year: "2020",
    term: " 36 months",
    grade: "1",
    currentBalance: "1000",
  },
  {
    homeOwnership: "RENT",
    quarter: "2",
    year: "2021",
    term: " 60 months",
    grade: "2",
    currentBalance: "3000",
  },
];

describe("Filter functionality", () => {
  beforeEach(() => {
    useQuery.mockReturnValue({
      data: mockData,
    });
  });

  it("renders all filters", () => {
    render(<Main />);
    expect(screen.getByText(/Select Home Ownership/i)).toBeInTheDocument();
    expect(screen.getByText(/Select Quarter/i)).toBeInTheDocument();
    expect(screen.getByText(/Select Year/i)).toBeInTheDocument();
    expect(screen.getByText(/Select Term/i)).toBeInTheDocument();
  });

  it("filters home ownership values", () => {
    render(<Main />);

    const select = screen.getByTestId("select-home-ownership", {
      name: /home ownership/i,
    });

    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
    expect(screen.getByText("$3,000.00")).toBeInTheDocument();

    fireEvent.change(select, { target: { value: "OWN" } });
    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
    expect(screen.queryByText("$3,000.00")).not.toBeInTheDocument();

    fireEvent.change(select, { target: { value: "RENT" } });
    expect(screen.getByText("$3,000.00")).toBeInTheDocument();
    expect(screen.queryByText("$1,000.00")).not.toBeInTheDocument();
  });

  it("filters quarter", () => {
    render(<Main />);

    const select = screen.getByTestId("select-quarter", {
      name: /quarter/i,
    });

    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
    expect(screen.getByText("$3,000.00")).toBeInTheDocument();

    fireEvent.change(select, { target: { value: "1" } });
    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
    expect(screen.queryByText("$3,000.00")).not.toBeInTheDocument();

    fireEvent.change(select, { target: { value: "2" } });
    expect(screen.getByText("$3,000.00")).toBeInTheDocument();
    expect(screen.queryByText("$1,000.00")).not.toBeInTheDocument();
  });

  it("filters year", () => {
    render(<Main />);

    const select = screen.getByTestId("select-year", {
      name: /year/i,
    });

    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
    expect(screen.getByText("$3,000.00")).toBeInTheDocument();

    fireEvent.change(select, { target: { value: "2020" } });
    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
    expect(screen.queryByText("$3,000.00")).not.toBeInTheDocument();

    fireEvent.change(select, { target: { value: "2021" } });
    expect(screen.getByText("$3,000.00")).toBeInTheDocument();
    expect(screen.queryByText("$1,000.00")).not.toBeInTheDocument();
  });

  it("filters year", () => {
    render(<Main />);

    const select = screen.getByTestId("select-term", {
      name: /term/i,
    });

    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
    expect(screen.getByText("$3,000.00")).toBeInTheDocument();

    fireEvent.change(select, { target: { value: " 36 months" } });
    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
    expect(screen.queryByText("$3,000.00")).not.toBeInTheDocument();

    fireEvent.change(select, { target: { value: " 60 months" } });
    expect(screen.getByText("$3,000.00")).toBeInTheDocument();
    expect(screen.queryByText("$1,000.00")).not.toBeInTheDocument();
  });

  it("shows no data if none", () => {
    render(<Main />);

    const selectQuarter = screen.getByTestId("select-quarter", {
      name: /quarter/i,
    });

    const selectYear = screen.getByTestId("select-year", {
      name: /year/i,
    });

    fireEvent.change(selectQuarter, { target: { value: "1" } });
    fireEvent.change(selectYear, { target: { value: "2021" } });

    expect(screen.getAllByText("No Data to Display")).toHaveLength(2);
  });
});
