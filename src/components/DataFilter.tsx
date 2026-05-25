import { Group, NativeSelect, MultiSelect, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import type { Program, OrganisationUnit, DataFilterData } from "../utils/types";
import CustomAlert from "./Alert";
import { LOCATION_TYPE_ORG_UNIT } from "../utils/static";

type DataFilterProps = {
  endPoint: string;
  outputType: string;
  getData: (data: DataFilterData[]) => void;
  programDisabled?: boolean;
  programStageDisabled?: boolean;
  defaultProgramId?: string;
  defaultProgramStageId?: string;
  defaultDataElementId?: string;
  defaultDataElementValue?: string;
  locationType?: string;
};

export default function DataFilter({
  endPoint,
  outputType,
  getData,
  programDisabled = false,
  programStageDisabled = false,
  defaultProgramId = "",
  defaultProgramStageId = "",
  defaultDataElementId = "",
  defaultDataElementValue = "",
  locationType = LOCATION_TYPE_ORG_UNIT,
}: DataFilterProps) {
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);
  const [selectedProgramId, setSelectedProgramId] =
    useState<string>(defaultProgramId);
  const [selectedProgramStageId, setSelectedProgramStageId] = useState<string>(
    defaultProgramStageId,
  );

  const programs: Program[] = JSON.parse(
    localStorage.getItem("programs") ?? "[]",
  );
  const organisationUnits: OrganisationUnit[] = JSON.parse(
    locationType === "organisationUnit"
      ? (localStorage.getItem("organisationUnits") ?? "[]")
      : (localStorage.getItem("userGroups") ?? "[]"),
  );
  const [selectedOrganisationUnits, setSelectedOrganisationUnits] = useState<
    OrganisationUnit[]
  >([]);

  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const onSelectOrgUnit = (selected: string[]) => {
    if (selected.includes("all")) {
      setSelectedOrganisationUnits(organisationUnits);
      return;
    }

    const selectedOrgUnits: OrganisationUnit[] = [];
    selected.forEach((selected) => {
      const ou = organisationUnits.find((ou) => ou.id === selected);
      if (ou) {
        selectedOrgUnits.push(ou);
      }
    });

    setSelectedOrganisationUnits(selectedOrgUnits);
  };

  const applyFilters = () => {
    if (selectedProgramId == "" && locationType === LOCATION_TYPE_ORG_UNIT) {
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

    getData(getUrls());
  };

  const getUrls = () => {
    return selectedOrganisationUnits.map((organisationUnit) => {
      const base = {
        orgUnitId: organisationUnit.id,
        orgUnitName: organisationUnit.displayName,
      };

      const stageParam =
        selectedProgramStageId === "" ? "" : `stage=${selectedProgramStageId}&`;

      const dataElementParam = defaultDataElementId === "" ? "" : `filter=${defaultDataElementId}:EQ:${defaultDataElementValue}&`

      let url: string = "";
      if (locationType == LOCATION_TYPE_ORG_UNIT) {
        url = `${endPoint}/${selectedProgramId}?${stageParam}${dataElementParam}startDate=${dateRange[0]}&endDate=${dateRange[1]}&dimension=ou:${organisationUnit.id}&outputType=${outputType}&pageSize=1&totalPages=true`;
      } else {
        url = `${endPoint}?filter=userGroups.id:eq:${organisationUnit.id}&filter=lastLogin:ge:${dateRange[0]}&filter=lastLogin:le:${dateRange[1]}&pageSize=1`;
      }

      return { ...base, url };
    });
  };

  return (
    <>
      <Group justify="space-between" align="flex-end" grow>
        <NativeSelect
          label="*Program"
          disabled={programDisabled}
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
          disabled={programStageDisabled}
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
          label={
            locationType === LOCATION_TYPE_ORG_UNIT
              ? "*Organisation unit"
              : "*User group"
          }
          data={[
            { value: "all", label: locationType === LOCATION_TYPE_ORG_UNIT ? "All districts" : "All user groups" },
            ...organisationUnits.map((ou) => ({
              value: ou.id,
              label: ou.displayName,
            })),
          ]}
          value={selectedOrganisationUnits.map((ou) => ou.id)}
          onChange={onSelectOrgUnit}
          clearable
          leftSection={
            selectedOrganisationUnits.length > 0 ? (
              <span
                style={{ fontSize: 14, color: "black", whiteSpace: "nowrap" }}
              >
                {selectedOrganisationUnits.length} {locationType === LOCATION_TYPE_ORG_UNIT ? "districts" : "user groups"} selected
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
