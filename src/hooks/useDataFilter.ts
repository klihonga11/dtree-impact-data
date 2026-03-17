import { useState } from "react";
import type { IndividualsServedResponse, TableRowType } from "../utils/types";

type DataFilterReturnType = {
  isLoading: boolean;
  tableRows: TableRowType[];
  fetchData: (
    programId: string,
    programStageId: string,
    organisationUnits: string[],
    dateRange: [string | null, string | null],
    outputType: string,
  ) => Promise<void>;
};

export const useDataFilter = (): DataFilterReturnType => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tableRows, setTableRows] = useState<TableRowType[]>([]);

  const fetchData = async (
    programId: string,
    programStageId: string,
    organisationUnits: string[],
    dateRange: [string | null, string | null],
    outputType: string,
  ) => {
    try {
      const promises: Promise<IndividualsServedResponse>[] = [];
      organisationUnits.forEach((organisationUnitId) => {
        const url = `/dhis2/api/analytics/events/query/${programId}?${programStageId === "" ? "" : "stage=" + programStageId + "&"}startDate=${dateRange[0]}&endDate=${dateRange[1]}&dimension=ou:${organisationUnitId}&outputType=${outputType}&pageSize=1&totalPages=true`;
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

  const loadResults = async (
    promises: Promise<IndividualsServedResponse>[],
  ) => {
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
