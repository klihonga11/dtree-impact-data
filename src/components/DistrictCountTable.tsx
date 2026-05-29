import { Group, Space, Switch, Table } from "@mantine/core";
import type { TableRowType } from "../utils/types";
import { useState } from "react";
import { LOCATION_TYPE_ORG_UNIT } from "../utils/static";

type DistrictCountTableProps = {
  tableRows: TableRowType[];
  locationType?: string; 
};
export default function DistrictCountTable({
  tableRows,
  locationType = LOCATION_TYPE_ORG_UNIT
}: DistrictCountTableProps) {
  const [hideZeroes, setHideZeroes] = useState<boolean>(true);
  const [sortByCount, setSortByCount] = useState<boolean>(false);

  const filtered = hideZeroes ? tableRows.filter((row) => row.count > 0): tableRows;
  const sorted = sortByCount ? filtered.sort((a,b) => b.count - a.count) : filtered

  const rows = sorted.map((element, index) => {
    return <Table.Tr key={element.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.district}</Table.Td>
      <Table.Td>{element.count}</Table.Td>
    </Table.Tr>
  });

  //TODO: Reduce the width of the number column

  return (
    <>
      <Group>
        <Switch checked={hideZeroes} onChange={(event) => setHideZeroes(event.currentTarget.checked)} label="Hide zeroes"/>
        <Switch checked={sortByCount} onChange={(event) => setSortByCount(event.currentTarget.checked)} label="Sort by count"/>  
      </Group>
      <Space h="lg"/>
      <Table.ScrollContainer minWidth={500} maxHeight={525}>
        <Table highlightOnHover stickyHeader>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: 1, whiteSpace: 'nowrap' }}>#</Table.Th>
              <Table.Th>{locationType === LOCATION_TYPE_ORG_UNIT ? "District" : "User group"}</Table.Th>
              <Table.Th >Count</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows}
            <Table.Tr style={{ borderTop: "2px solid #000" }}>
              <Table.Td fw={700}></Table.Td>
              <Table.Td fw={700}>TOTAL</Table.Td>
              <Table.Td fw={700}>
                {tableRows.reduce((sum, item) => sum + item.count, 0)}
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}
