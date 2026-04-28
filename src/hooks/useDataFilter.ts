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

  const fetchData = async (data: DataFilterData[]) => {
    try {
      const promises: Promise<AnalyticsEventResponse>[] = [];
      data.forEach((d) => {
        promises.push(
          fetch(d.url, { credentials: "include" }).then((result) =>
            result.json(),
          ),
        );
      });

      setIsLoading(true);
      await loadResults(promises, data);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadResults = async (
    promises: Promise<AnalyticsEventResponse>[],
    data: DataFilterData[],
  ) => {
    const results = await Promise.all(promises);

    const rows: TableRowType[] = [];
    results.forEach((result, index) => {
      rows.push({
        id: data[index].orgUnitId,
        district: data[index].orgUnitName,
        count: result.metaData.pager.pageCount,
      });
    });

    setTableRows(rows);
  };

  const fetchUserData = async (userData: DataFilterData[]) => {
    try {
      const promises: Promise<UserResponse>[] = [];
      userData.forEach((ud) => {
        promises.push(
          fetch(ud.url, { credentials: "include" }).then((result) =>
            result.json(),
          ),
        );
      });

      setIsLoading(true);
      await loadUserResults(promises, userData);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserResults = async (
    promises: Promise<UserResponse>[],
    userData: DataFilterData[],
  ) => {
    const results = await Promise.all(promises);

    const rows: TableRowType[] = [];
    results.forEach((data, index) => {
      rows.push({
        id: userData[index].orgUnitId,
        district: userData[index].orgUnitName,
        count: data.pager.total,
      });
    });

    setTableRows(rows);
  };

  return { isLoading, tableRows, fetchData, fetchUserData };
};
