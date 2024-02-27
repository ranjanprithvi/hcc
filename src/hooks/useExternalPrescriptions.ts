import { ExternalPrescription } from "../models/externalPrescription";
import useData from "./generic/useData";

const useExternalPrescriptions = (
    query?: { profileId: string },
    deps?: any[]
) => {
    const {
        data: externalPrescriptions,
        setData: setExternalPrescriptions,
        error,
        setError,
        isLoading,
    } = useData<ExternalPrescription>("/externalPrescriptions", query, deps);
    return {
        externalPrescriptions,
        setExternalPrescriptions,
        error,
        setError,
        isLoading,
    };
};

export default useExternalPrescriptions;
