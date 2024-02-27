import { ExternalRecord } from "../models/externalRecord";
import useDataItem from "./generic/useDataItem";

const useExternalRecord = (id: string) => {
    const {
        data: externalRecord,
        setData: setExternalRecord,
        error,
        setError,
        isLoading,
    } = useDataItem<ExternalRecord>("/externalRecords", id, {}, []);
    return { externalRecord, setExternalRecord, error, setError, isLoading };
};

export default useExternalRecord;
