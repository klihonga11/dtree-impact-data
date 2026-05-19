import { Switch, Table } from "@mantine/core";
import type { TableRowType } from "../utils/types";
import { useState } from "react";

type DistrictCountTableProps = {
  tableRows: TableRowType[];
};
export default function DistrictCountTable({
  tableRows,
}: DistrictCountTableProps) {
  const [hideZeroes, setHideZeroes] = useState<boolean>(true);

  const districts = hideZeroes ? tableRows.filter((row) => row.count > 0): tableRows;

  const rows = districts.map((element, index) => {
    return <Table.Tr key={element.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.district}</Table.Td>
      <Table.Td>{element.count}</Table.Td>
    </Table.Tr>
  });

  //TODO: Reduce the width of the number column

  return (
    <Table highlightOnHover stickyHeader>
      <Table.Thead>
        <Table.Tr>
          <Switch p={8} checked={hideZeroes} onChange={(event) => setHideZeroes(event.currentTarget.checked)} label="Hide zeroes"/>
        </Table.Tr>
        <Table.Tr>
          <Table.Th style={{ width: 1, whiteSpace: 'nowrap' }}>#</Table.Th>
          <Table.Th>District</Table.Th>
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
  );
}
