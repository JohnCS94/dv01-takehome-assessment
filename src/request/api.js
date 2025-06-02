import Papa from "papaparse";
import rawData from "./loansize.csv";

const parseData = (result, rawData) => {
  result.data.splice(0, 2);
  const { data } = result;
  for (let i = 0; i < data.length; i += 1) {
    /**
     * CSV had an extra line at the bottom of file. Instead of modifying the
     * file, I added these lines of code to the parseData function to remove
     * any lines that shouldn't be included in the data
     */
    const row = data[i];
    if (!row || row.every((cell) => cell === "")) continue;

    const year = data[i][0];
    const quarter = data[i][1];
    const grade = data[i][2];
    const homeOwnership = data[i][3];
    const term = data[i][4];
    const currentBalance = data[i][5];
    rawData.push({
      year,
      quarter,
      grade,
      homeOwnership,
      term,
      currentBalance,
    });
  }

  return rawData;
};

export const getData = async () => {
  const csvData = await fetch(rawData).then((response) => {
    return response.text();
  });
  const data = [];
  await Papa.parse(csvData, {
    complete: (result) => parseData(result, data),
  });

  return data;
};
