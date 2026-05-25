import { Space, Center, Loader } from "@mantine/core";
import DataFilter from "../components/DataFilter";
import DistrictCountTable from "../components/DistrictCountTable";
import { useDataFilter } from "../hooks/useDataFilter";
import {
  ENDPOINT_USERS,
  LOCATION_TYPE_USER_GROUP,
  OUTPUT_TYPE_EVENT,
} from "../utils/static";

export default function HealthWorkersSupported() {
  const { isLoading, tableRows, fetchUserData } = useDataFilter();

  return (
    <>
      <DataFilter
        endPoint={ENDPOINT_USERS}
        outputType={OUTPUT_TYPE_EVENT}
        getData={fetchUserData}
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
        <DistrictCountTable tableRows={tableRows} locationType={LOCATION_TYPE_USER_GROUP} />
      )}
    </>
  );
}
