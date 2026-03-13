import { Center, Loader, Space, Table } from "@mantine/core";
import DataFilter from "../components/DataFilter";
import { useDataFilter } from "../hooks/useDataFilter";

export default function IndividualsServed() {
  const { isLoading, tableRows, fetchData } = useDataFilter();

  const rows = tableRows.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.district}</Table.Td>
      <Table.Td>{element.count}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <DataFilter getData={fetchData} />

      <Space h="lg" />

      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <Table highlightOnHover stickyHeader>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>District</Table.Th>
              <Table.Th>Count</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows}
            <Table.Tr style={{ borderTop: "2px solid #000" }}>
              <Table.Td fw={700}>TOTAL</Table.Td>
              <Table.Td fw={700}>
                {tableRows.reduce((sum, item) => sum + item.count, 0)}
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      )}
    </>
  );
}
