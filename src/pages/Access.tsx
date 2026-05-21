import { Space, Center, Loader } from "@mantine/core";
import DataFilter from "../components/DataFilter";
import DistrictCountTable from "../components/DistrictCountTable";
import { useDataFilter } from "../hooks/useDataFilter";
import {
  ENDPOINT_ANALYTICS_ENROLLMENTS,
  FAMILY_PLANNING_PROGRAM_STAGE_ID,
  OUTPUT_TYPE_ENROLLMENT,
  PERSON_REGISTER_PROGRAM_ID,
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
        defaultProgramId={PERSON_REGISTER_PROGRAM_ID}
        defaultProgramStageId={FAMILY_PLANNING_PROGRAM_STAGE_ID}
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
