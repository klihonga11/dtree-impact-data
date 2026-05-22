import { Center, Loader, Space } from "@mantine/core";
import DataFilter from "../components/DataFilter";
import DistrictCountTable from "../components/DistrictCountTable";
import { useDataFilter } from "../hooks/useDataFilter";
import { CBMNC_WOMAN_PROGRAM_ID, CONTINUITY_DATA_ELEMENT_ID, ENDPOINT_ANALYTICS_EVENTS, OUTPUT_TYPE_EVENT, PREGNANCY_PERIOD_PROGRAM_STAGE_ID } from "../utils/static";
export default function IndividualAgency() {
    const { isLoading, tableRows, fetchData } = useDataFilter();

    return (
        <>
            <DataFilter
                endPoint={ENDPOINT_ANALYTICS_EVENTS}
                outputType={OUTPUT_TYPE_EVENT}
                getData={fetchData}
                programDisabled
                programStageDisabled
                defaultProgramId={CBMNC_WOMAN_PROGRAM_ID}
                defaultProgramStageId={PREGNANCY_PERIOD_PROGRAM_STAGE_ID}
                defaultDataElementId={CONTINUITY_DATA_ELEMENT_ID}
                defaultDataElementValue="1"
            />

            <Space h="lg" />

            {isLoading ? (
                <Center>
                    <Loader />
                </Center>
            ) : (
                <DistrictCountTable tableRows={tableRows} />
            )}
        </>
    )
}