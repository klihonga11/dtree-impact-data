export type Program = {
  id: string;
  displayName: string;
};

export type ProgramsResponse = {
  pager: {
    page: number;
    total: number;
    pageSize: number;
    pageCount: number;
  };
  programs: Program[];
};

export type OrganisationUnit = {
  id: string;
  displayName: string;
};

export type OrganisationUnitResponse = {
  pager: {
    page: number;
    total: number;
    pageSize: number;
    pageCount: number;
  };
  organisationUnits: OrganisationUnit[];
};
