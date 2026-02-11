import { Button, MultiSelect, NativeSelect } from "@mantine/core";
import { useState } from "react";

export default function IndividualsServed() {
  type Program = {
    id: string;
    displayName: string;
  };

  type ProgramsResponse = {
    pager: {
      page: number;
      total: number;
      pageSize: number;
      pageCount: number;
    };
    programs: Program[];
  };

  type OrganisationUnit = {
    id: string;
    displayName: string;
  };

  type OrganisationUnitResponse = {
    pager: {
      page: number;
      total: number;
      pageSize: number;
      pageCount: number;
    };
    organisationUnits: OrganisationUnit[];
  };

  const [programs, setPrograms] = useState<Program[]>([]);
  const [organisationUnit, setOrganisationUnits] = useState<OrganisationUnit[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPrograms = async () => {
    try {
      const response = await fetch("/dhis2/api/programs", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to get programs");
      }

      const data: ProgramsResponse = await response.json();
      setPrograms(data.programs);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getOrganizationUnits = async () => {
    const response = await fetch(
      "/dhis2/api/organisationUnits?filter=level:in:[1,3]",
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get organisation units");
    }

    const data: OrganisationUnitResponse = await response.json();
    setOrganisationUnits(data.organisationUnits);
  };

  const downloadData = async () => {
    try {
      setIsLoading(true);
      await getPrograms();
      await getOrganizationUnits();
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={downloadData}>Click me!</Button>
      <NativeSelect
        label="Programs"
        disabled={isLoading}
        data={programs.map((p) => ({
          value: p.id,
          label: p.displayName,
        }))}
      />

      <MultiSelect
        label="Organisation units"
        disabled={isLoading}
        data={organisationUnit.map((p) => ({
          value: p.id,
          label: p.displayName,
        }))}
      />
    </>
  );
}
