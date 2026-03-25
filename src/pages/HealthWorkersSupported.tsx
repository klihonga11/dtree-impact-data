import { Space, Center, Loader } from "@mantine/core";
import DataFilter from "../components/DataFilter";
import DistrictCountTable from "../components/DistrictCountTable";
import { useDataFilter } from "../hooks/useDataFilter";
import {
  ENDPOINT_ANALYTICS_EVENTS,
  LOCATION_TYPE_USER_GROUP,
  OUTPUT_TYPE_EVENT,
} from "../utils/static";

export default function HealthWorkersSupported() {
  const { isLoading, tableRows, fetchData } = useDataFilter();

  return (
    <>
      <DataFilter
        endPoint={ENDPOINT_ANALYTICS_EVENTS}
        outputType={OUTPUT_TYPE_EVENT}
        getData={fetchData}
        programDisabled
        programStageDisabled
        locationType={LOCATION_TYPE_USER_GROUP}
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
