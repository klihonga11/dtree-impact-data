import { Center, Loader, Space } from "@mantine/core";
import DataFilter from "../components/DataFilter";
import { useDataFilter } from "../hooks/useDataFilter";
import DistrictCountTable from "../components/DistrictCountTable";
import {
  ENDPOINT_ANALYTICS_EVENTS,
  OUTPUT_TYPE_ENROLLMENT,
} from "../utils/static";

export default function IndividualsServed() {
  const { isLoading, tableRows, fetchData } = useDataFilter();

  return (
    <>
      <DataFilter
        endPoint={ENDPOINT_ANALYTICS_EVENTS}
        outputType={OUTPUT_TYPE_ENROLLMENT}
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
