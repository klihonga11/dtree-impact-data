import {
  Button,
  Center,
  Group,
  Loader,
  MultiSelect,
  NativeSelect,
  Space,
  Table,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import type {
  IndividualsServedResponse,
  OrganisationUnit,
  Program,
} from "../utils/types";
import CustomAlert from "../components/Alert";

export default function IndividualsServed() {
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  const programs: Program[] = JSON.parse(
    localStorage.getItem("programs") ?? "[]",
  );
  const [selectedProgramId, setSelectedProgramId] = useState<string>("");

  const organisationUnits: OrganisationUnit[] = JSON.parse(
    localStorage.getItem("organisationUnits") ?? "[]",
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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const applyFilters = () => {
    if (selectedProgramId == "") {
      setAlertMessage("Please select a program");
      setIsAlertVisible(true);
      return;
    }

    if (selectedOrganisationUnits.length == 0) {
      setAlertMessage("Please select an organisation unit");
      setIsAlertVisible(true);
      return;
    }

    if (dateRange[0] === null || dateRange[1] === null) {
      setAlertMessage("Please select a date range");
      setIsAlertVisible(true);
      return;
    }

    populateTable();
  };

  const populateTable = async () => {
    try {
      setTableRows([]); // clear the table
      setIsLoading(true);

      const tempRows = [];
      for (const ou of selectedOrganisationUnits) {
        const data = await getData(ou);
        tempRows.push(data);
      }

      setTableRows(tempRows); // update the table
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getData = async (organisationUnitId: string): Promise<RowType> => {
    try {
      const url = `/dhis2/api/analytics/events/query/${selectedProgramId}?startDate=${dateRange[0]}&endDate=${dateRange[1]}&dimension=ou:${organisationUnitId}&outputType=ENROLLMENT&pageSize=1&totalPages=true`;

      const response = await fetch(url, {
        credentials: "include",
      });

      const data: IndividualsServedResponse = await response.json();

      return {
        id: organisationUnitId,
        district:
          organisationUnits.find((ou) => ou.id === organisationUnitId)
            ?.displayName ?? "",
        count: data.metaData.pager.pageCount,
      };
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  };

  const rows = tableRows.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.district}</Table.Td>
      <Table.Td>{element.count}</Table.Td>
    </Table.Tr>
  ));

  const onSelectOrgUnit = (selected: string[]) => {
    if (selected.includes("all")) {
      setSelectedOrganisationUnits(organisationUnits.map((ou) => ou.id));
      return;
    }

    setSelectedOrganisationUnits(selected);
  };

  return (
    <>
      <Group justify="space-between" align="flex-end" grow>
        <NativeSelect
          label="Programs"
          data={[
            { value: "", label: "", disabled: true },
            ...programs.map((p) => ({
              value: p.id,
              label: p.displayName,
            })),
          ]}
          value={selectedProgramId}
          onChange={(event) => setSelectedProgramId(event.target.value)}
        />

        <MultiSelect
          label="Organisation units"
          data={[
            { value: "all", label: "All districts" },
            ...organisationUnits.map((ou) => ({
              value: ou.id,
              label: ou.displayName,
            })),
          ]}
          value={selectedOrganisationUnits}
          onChange={onSelectOrgUnit}
          clearable
          leftSection={
            selectedOrganisationUnits.length > 0 ? (
              <span
                style={{ fontSize: 14, color: "black", whiteSpace: "nowrap" }}
              >
                {selectedOrganisationUnits.length} districts selected
              </span>
            ) : null
          }
          leftSectionWidth={selectedOrganisationUnits.length > 0 ? 160 : 0}
          styles={{
            pill: { display: "none" },
            inputField: { display: "none" },
          }}
        />

        <DatePickerInput
          type="range"
          label="Date range"
          value={dateRange}
          onChange={setDateRange}
        />

        <Button onClick={applyFilters}>Apply</Button>
      </Group>

      <Space h="lg" />

      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <Table>
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

      {isAlertVisible && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setIsAlertVisible(false)}
        />
      )}
    </>
  );
}
