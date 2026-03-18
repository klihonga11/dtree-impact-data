import { useState } from "react";
import type { AnalyticsEventResponse, TableRowType } from "../utils/types";

type DataFilterReturnType = {
  isLoading: boolean;
  tableRows: TableRowType[];
  fetchData: (urls: string[]) => Promise<void>;
};

export const useDataFilter = (): DataFilterReturnType => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tableRows, setTableRows] = useState<TableRowType[]>([]);

  const fetchData = async (urls: string[]) => {
    try {
      const promises: Promise<AnalyticsEventResponse>[] = [];
      urls.forEach((url) => {
        promises.push(
          fetch(url, { credentials: "include" }).then((result) =>
            result.json(),
          ),
        );
      });

      setIsLoading(true);
      await loadResults(promises);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadResults = async (promises: Promise<AnalyticsEventResponse>[]) => {
    const results = await Promise.all(promises);

    const rows: TableRowType[] = [];
    results.forEach((data) => {
      const ou = data.metaData.dimensions.ou[0];
      rows.push({
        id: ou,
        district: data.metaData.items[ou].name,
        count: data.metaData.pager.pageCount,
      });
    });

    setTableRows(rows);
  };

  return { isLoading, tableRows, fetchData };
};
