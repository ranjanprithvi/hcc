import { Medication } from "../models/medication";
import useData from "./generic/useData";

const useMedications = (query?: { search: string }, deps?: any[]) => {
    const {
        data: medications,
        setData: setMedications,
        error,
        setError,
        isLoading,
    } = useData<Medication>("/medications", query, deps);
    return { medications, setMedications, error, setError, isLoading };
};

export default useMedications;
