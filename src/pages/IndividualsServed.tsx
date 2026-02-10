import { Button, NativeSelect } from "@mantine/core";
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

  const [programs, setPrograms] = useState<Program[]>([]);
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
      setIsLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <Button onClick={getPrograms}>Click me!</Button>
      <NativeSelect
        disabled={isLoading}
        data={programs.map((p) => ({
          value: p.id,
          label: p.displayName,
        }))}
      />
    </>
  );
}
