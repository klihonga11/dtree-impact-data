import { Button, Group, MultiSelect, NativeSelect, Table } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import type {
  IndividualsServedResponse,
  OrganisationUnit,
  Program,
} from "../utils/types";

export default function IndividualsServed() {
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  const programs: Program[] = JSON.parse(
    localStorage.getItem("programs") ?? "[]"
  );
  const [selectedProgramId, setSelectedProgramId] = useState<string>("");

  const organisationUnits: OrganisationUnit[] = JSON.parse(
    localStorage.getItem("organisationUnits") ?? "[]"
  );
  const [selectedOrganisationUnits, setSelectedOrganisationUnits] = useState<
    string[]
  >([]);

  type RowType = {
    id: string;
    district: string;
    count: number;
  };
  const [tableRows, setTableRows] = useState<RowType[]>([]);

  const getData = async () => {
    try {
      const url = `/dhis2/api/analytics/events/query/${selectedProgramId}?startDate=${dateRange[0]}&endDate=${dateRange[1]}&dimension=ou:${selectedOrganisationUnits.join(";")}&outputType=ENROLLMENT&pageSize=1&totalPages=true`;

      const response = await fetch(url, {
        credentials: "include",
      });

      const data: IndividualsServedResponse = await response.json();

      setTableRows([
        {
          id: selectedOrganisationUnits[0],
          district: selectedOrganisationUnits[0],
          count: data.metaData.pager.pageCount,
        },
      ]);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const rows = tableRows.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.district}</Table.Td>
      <Table.Td>{element.count}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Group justify="space-between" align="flex-end" grow>
        <NativeSelect
          label="Programs"
          data={programs.map((p) => ({
            value: p.id,
            label: p.displayName,
          }))}
          value={selectedProgramId}
          onChange={(event) => setSelectedProgramId(event.target.value)}
        />

        <MultiSelect
          label="Organisation units"
          data={organisationUnits.map((p) => ({
            value: p.id,
            label: p.displayName,
          }))}
          value={selectedOrganisationUnits}
          onChange={setSelectedOrganisationUnits}
        />

        <DatePickerInput
          type="range"
          label="Pick a date range"
          placeholder="Pick dates range"
          value={dateRange}
          onChange={setDateRange}
        />

        <Button onClick={getData}>Apply</Button>
      </Group>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>District</Table.Th>
            <Table.Th>Count</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
