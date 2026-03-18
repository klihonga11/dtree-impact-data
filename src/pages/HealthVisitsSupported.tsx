import { Space, Center, Loader } from "@mantine/core";
import DataFilter from "../components/DataFilter";
import DistrictCountTable from "../components/DistrictCountTable";
import { useDataFilter } from "../hooks/useDataFilter";
import { OUTPUT_TYPE_EVENT } from "../utils/static";

export default function HealthVisitsSupported() {
  const { isLoading, tableRows, fetchData } = useDataFilter();

  // const url = `/dhis2/api/analytics/events/query/${programId}?${programStageId === "" ? "" : "stage=" + programStageId + "&"}startDate=${dateRange[0]}&endDate=${dateRange[1]}&dimension=ou:${organisationUnitId}&outputType=${outputType}&pageSize=1&totalPages=true`;
  // pass the endpoint to the datafilter component as a prop
  // data filter component should call fetch data passing its own selected fields plus the output type

  return (
    <>
      <DataFilter outputType={OUTPUT_TYPE_EVENT} getData={fetchData} />

      <Space h="lg" />

      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <DistrictCountTable tableRows={tableRows} />
      )}
    </>
  );
}
