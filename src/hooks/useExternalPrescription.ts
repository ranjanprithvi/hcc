import { ExternalPrescription } from "../models/externalPrescription";
import useDataItem from "./generic/useDataItem";

const useExternalPrescription = (id: string) => {
    const {
        data: externalPrescription,
        setData: setExternalPrescription,
        error,
        setError,
        isLoading,
    } = useDataItem<ExternalPrescription>("/prescriptions", id, {}, []);
    return {
        externalPrescription,
        setExternalPrescription,
        error,
        setError,
        isLoading,
    };
};

export default useExternalPrescription;
