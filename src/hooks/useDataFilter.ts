import { useState } from "react";
import type {
  AnalyticsEventResponse,
  TableRowType,
  DataFilterData,
  UserResponse,
} from "../utils/types";

type DataFilterReturnType = {
  isLoading: boolean;
  tableRows: TableRowType[];
  fetchData: (data: DataFilterData[]) => Promise<void>;
  fetchUserData: (data: DataFilterData[]) => Promise<void>;
};

export const useDataFilter = (): DataFilterReturnType => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tableRows, setTableRows] = useState<TableRowType[]>([]);

  const fetchAndLoad = async <T>(
    data: DataFilterData[],
    extractCount: (response: T) => number,
  ) => {
    try {
      setIsLoading(true);

      const results = await Promise.all(
        data.map(async (d) => {
          const res = await fetch(d.url, { credentials: "include" });
          return res.json() as Promise<T>;
        }),
      );

      const rows: TableRowType[] = results.map((result, index) => ({
        id: data[index].orgUnitId,
        district: data[index].orgUnitName,
        count: extractCount(result),
      }));

      setTableRows(rows);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = (data: DataFilterData[]) =>
    fetchAndLoad<AnalyticsEventResponse>(
      data,
      (result) => result.metaData.pager.pageCount,
    );

  const fetchUserData = (userData: DataFilterData[]) =>
    fetchAndLoad<UserResponse>(userData, (result) => result.pager.total);

  return { isLoading, tableRows, fetchData, fetchUserData };
};
