import type {
  OrganisationUnitResponse,
  ProgramsResponse,
  UserGroupResponse,
} from "./types";

const getPrograms = async () => {
  try {
    const response = await fetch(
      "/dhis2/api/programs?fields=id,name,programStages[id,name]",
      {
        credentials: "include",
      },
    );

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

const getUserGroups = async () => {
  const response = await fetch("/dhis2/api/userGroups?pageSize=100", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get user groups");
  }

  const data: UserGroupResponse = await response.json();
  const userGroups = data.userGroups.filter((ug) =>
    ug.displayName.includes("HSAs"),
  );
  localStorage.setItem("userGroups", JSON.stringify(userGroups));
};

export const init = async () => {
  try {
    const programs = localStorage.getItem("programs");
    const organisationUnits = localStorage.getItem("organisationUnits");
    const userGroups = localStorage.getItem("userGroups");

    if (
      programs === null ||
      organisationUnits === null ||
      userGroups === null
    ) {
      await getPrograms();
      await getOrganizationUnits();
      await getUserGroups();
    }
  } catch (error) {
    console.log("Error", error);
  }
};
