import { Center, Loader, Space } from "@mantine/core";
import DataFilter from "../components/DataFilter";
import DistrictCountTable from "../components/DistrictCountTable";
import { useDataFilter } from "../hooks/useDataFilter";
import { CBMNC_WOMAN_PROGRAM_ID, DELIVERY_PROGRAM_STAGE_ID, ENDPOINT_ANALYTICS_EVENTS, PLACE_OF_DELIVERY_ELEMENT_ID, OUTPUT_TYPE_EVENT } from "../utils/static";
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
                defaultProgramStageId={DELIVERY_PROGRAM_STAGE_ID}
                defaultDataElementId={PLACE_OF_DELIVERY_ELEMENT_ID}
                defaultDataElementValue="health_facility"
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