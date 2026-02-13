import { Button, Group, MultiSelect, NativeSelect } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import type { OrganisationUnit, Program } from "../utils/types";

export default function IndividualsServed() {
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  const programsData = localStorage.getItem("programs");
  const organisationUnitsData = localStorage.getItem("organisationUnits");

  let programs: Program[] = [];
  let organisationUnits: OrganisationUnit[] = [];

  if (programsData !== null) {
    programs = JSON.parse(programsData);
  }

  if (organisationUnitsData !== null) {
    organisationUnits = JSON.parse(organisationUnitsData);
  }

  return (
    <>
      <Group justify="space-between" align="flex-end" grow>
        <NativeSelect
          label="Programs"
          data={programs.map((p) => ({
            value: p.id,
            label: p.displayName,
          }))}
        />

        <MultiSelect
          label="Organisation units"
          data={organisationUnits.map((p) => ({
            value: p.id,
            label: p.displayName,
          }))}
        />

        <DatePickerInput
          type="range"
          label="Pick a date range"
          placeholder="Pick dates range"
          value={dateRange}
          onChange={setDateRange}
        />

        <Button>Apply</Button>
      </Group>
    </>
  );
}
