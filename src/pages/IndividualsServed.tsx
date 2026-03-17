import { Center, Loader, Space } from "@mantine/core";
import DataFilter from "../components/DataFilter";
import { useDataFilter } from "../hooks/useDataFilter";
import DistrictCountTable from "../components/DistrictCountTable";

export default function IndividualsServed() {
  const { isLoading, tableRows, fetchData } = useDataFilter();

  return (
    <>
      <DataFilter getData={fetchData} />

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
