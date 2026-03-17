import { Group, NativeSelect, MultiSelect, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import type { Program, OrganisationUnit } from "../utils/types";
import CustomAlert from "./Alert";
import { OUTPUT_TYPE_ENROLLMENT } from "../utils/static";

type DataFilterProps = {
  getData: (
    programId: string,
    programStageId: string,
    organisationUnits: string[],
    dateRange: [string | null, string | null],
    outputType: string,
  ) => void;
};

export default function DataFilter({ getData }: DataFilterProps) {
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  const programs: Program[] = JSON.parse(
    localStorage.getItem("programs") ?? "[]",
  );
  const [selectedProgramId, setSelectedProgramId] = useState<string>("");
  const [selectedProgramStageId, setSelectedProgramStageId] =
    useState<string>("");

  const organisationUnits: OrganisationUnit[] = JSON.parse(
    localStorage.getItem("organisationUnits") ?? "[]",
  );
  const [selectedOrganisationUnits, setSelectedOrganisationUnits] = useState<
    string[]
  >([]);

  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const onSelectOrgUnit = (selected: string[]) => {
    if (selected.includes("all")) {
      setSelectedOrganisationUnits(organisationUnits.map((ou) => ou.id));
      return;
    }

    setSelectedOrganisationUnits(selected);
  };

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

    getData(
      selectedProgramId,
      selectedProgramStageId,
      selectedOrganisationUnits,
      dateRange,
      OUTPUT_TYPE_ENROLLMENT,
    );
  };

  return (
    <>
      <Group justify="space-between" align="flex-end" grow>
        <NativeSelect
          label="*Program"
          styles={{ input: { color: "black" } }}
          data={[
            { value: "", label: "", disabled: true },
            ...programs.map((p) => ({
              value: p.id,
              label: p.name,
            })),
          ]}
          value={selectedProgramId}
          onChange={(event) => setSelectedProgramId(event.target.value)}
        />

        <NativeSelect
          label="Program stage"
          data={[
            { value: "", label: "" },
            ...(programs
              .find((p) => p.id === selectedProgramId)
              ?.programStages.map((ps) => ({
                value: ps.id,
                label: ps.name,
              })) ?? []),
          ]}
          value={selectedProgramStageId}
          onChange={(event) => setSelectedProgramStageId(event.target.value)}
        />

        <MultiSelect
          label="*Organisation unit"
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
          label="*Date range"
          value={dateRange}
          onChange={setDateRange}
        />

        <Button onClick={applyFilters}>Apply</Button>
      </Group>

      {isAlertVisible && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setIsAlertVisible(false)}
        />
      )}
    </>
  );
}
