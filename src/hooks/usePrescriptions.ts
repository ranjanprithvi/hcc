import { Prescription } from "../models/prescription";
import useData from "./generic/useData";

const usePrescriptions = (query?: { profile: string }, deps?: any[]) => {
    const {
        data: prescriptions,
        setData: setPrescriptions,
        error,
        setError,
        isLoading,
    } = useData<Prescription>("/prescriptions", query, deps);
    return { prescriptions, setPrescriptions, error, setError, isLoading };
};

export default usePrescriptions;
