import { ExternalRecord } from "../models/externalRecord";
import useData from "./generic/useData";

const useExternalRecords = (query?: { profileId: string }, deps?: any[]) => {
    const {
        data: externalRecords,
        setData: setExternalRecords,
        error,
        setError,
        isLoading,
    } = useData<ExternalRecord>("/externalRecords", query, deps);
    return { externalRecords, setExternalRecords, error, setError, isLoading };
};

export default useExternalRecords;
