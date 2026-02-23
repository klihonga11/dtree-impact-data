import { Button, Group, MultiSelect, NativeSelect } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import type { OrganisationUnit, Program } from "../utils/types";

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

  const getData = async () => {
    try {
      const url = `/dhis2/api/analytics/events/query/${selectedProgramId}?startDate=${dateRange[0]}&endDate=${dateRange[1]}&dimension=ou:${selectedOrganisationUnits.join(";")}&outputType=ENROLLMENT&pageSize=1&totalPages=true`;

      const response = await fetch(url);

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log("Error", error);
    }
  };

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
    </>
  );
}
