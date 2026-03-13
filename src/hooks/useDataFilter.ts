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
    console.log("start");
    console.log(programId);
    console.log(organisationUnits);
    console.log(dateRange);
    if (
      programId == "" ||
      organisationUnits?.length == 0 ||
      dateRange[0] == null ||
      dateRange[1] == null
    ) {
      return;
    }

    console.log("continue");
    const promises: Promise<IndividualsServedResponse>[] = [];
    organisationUnits.forEach((organisationUnitId) => {
      const url = `/dhis2/api/analytics/events/query/${programId}?${programStageId === "" ? "" : "stage=" + programStageId + "&"}startDate=${dateRange[0]}&endDate=${dateRange[1]}&dimension=ou:${organisationUnitId}&outputType=${outputType}&pageSize=1&totalPages=true`;
      promises.push(
        fetch(url, { credentials: "include" }).then((result) => result.json()),
      );
    });

    setIsLoading(true);
    const results = await Promise.all(promises);

    const rows: TableRowType[] = [];
    results.forEach((data) => {
      rows.push({
        id: data.metaData.dimensions.ou[0],
        district: data.metaData.items[0].name,
        count: data.metaData.pager.pageCount,
      });
    });

    setTableRows(rows);
    setIsLoading(false);
  };

  return { isLoading, tableRows, fetchData };
};
