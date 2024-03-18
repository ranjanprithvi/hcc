import { MedicalRecord } from "../models/medicalRecord";
import useData from "./generic/useData";

const useMedicalRecords = (query?: { profile: string }, deps?: any[]) => {
    const {
        data: medicalRecords,
        setData: setMedicalRecords,
        error,
        setError,
        isLoading,
    } = useData<MedicalRecord>("/medicalRecords", query, deps);
    return { medicalRecords, setMedicalRecords, error, setError, isLoading };
};

export default useMedicalRecords;
