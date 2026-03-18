import { Space, Center, Loader } from "@mantine/core";
import DataFilter from "../components/DataFilter";
import DistrictCountTable from "../components/DistrictCountTable";
import { useDataFilter } from "../hooks/useDataFilter";
import { ENDPOINT_ANALYTICS_EVENTS, OUTPUT_TYPE_EVENT } from "../utils/static";

export default function HealthVisitsSupported() {
  const { isLoading, tableRows, fetchData } = useDataFilter();

  return (
    <>
      <DataFilter
        endPoint={ENDPOINT_ANALYTICS_EVENTS}
        outputType={OUTPUT_TYPE_EVENT}
        getData={fetchData}
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
