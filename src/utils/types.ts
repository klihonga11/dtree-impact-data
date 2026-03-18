export type Program = {
  id: string;
  name: string;
  programStages: ProgramStage[];
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

export type ProgramStage = {
  id: string;
  name: string;
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

export type AnalyticsEventResponse = {
  metaData: {
    pager: {
      page: number;
      total: number;
      pageSize: number;
      pageCount: number;
    };
    items: {
      [key: string]: {
        name: string;
      };
    };
    dimensions: {
      ou: [string];
    };
  };
};

export type TableRowType = {
  id: string;
  district: string;
  count: number;
};
