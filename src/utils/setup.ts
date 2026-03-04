import type { OrganisationUnitResponse, ProgramsResponse } from "./types";

const getPrograms = async () => {
  try {
    const response = await fetch("/dhis2/api/programs", {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to get programs");
    }

    const data: ProgramsResponse = await response.json();
    localStorage.setItem("programs", JSON.stringify(data.programs));
  } catch (error) {
    console.log("Error", error);
  }
};

const getOrganizationUnits = async () => {
  const response = await fetch(
    "/dhis2/api/organisationUnits?filter=level:eq:3",
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to get organisation units");
  }

  const data: OrganisationUnitResponse = await response.json();
  const orgUnits = data.organisationUnits.filter((ou) =>
    ou.displayName.includes("-DHO"),
  );
  localStorage.setItem("organisationUnits", JSON.stringify(orgUnits));
};

export const init = async () => {
  try {
    const programs = localStorage.getItem("programs");
    const organisationUnits = localStorage.getItem("organisationUnits");

    if (programs === null || organisationUnits === null) {
      await getPrograms();
      await getOrganizationUnits();
    }
  } catch (error) {
    console.log("Error", error);
  }
};
