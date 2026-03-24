import { Space, Center, Loader } from "@mantine/core";
import DataFilter from "../components/DataFilter";
import DistrictCountTable from "../components/DistrictCountTable";
import { useDataFilter } from "../hooks/useDataFilter";
import {
  ENDPOINT_ANALYTICS_ENROLLMENTS,
  OUTPUT_TYPE_ENROLLMENT,
} from "../utils/static";

export default function Access() {
  const { isLoading, tableRows, fetchData } = useDataFilter();

  return (
    <>
      <DataFilter
        endPoint={ENDPOINT_ANALYTICS_ENROLLMENTS}
        outputType={OUTPUT_TYPE_ENROLLMENT}
        getData={fetchData}
        programDisabled
        programStageDisabled
        defaultProgramId="NFnp1h3IMzl"
      />

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
