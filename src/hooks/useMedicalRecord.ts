import { MedicalRecord } from "../models/medicalRecord";
import useDataItem from "./generic/useDataItem";

const useMedicalRecord = (id: string) => {
    const {
        data: medicalRecord,
        setData: setMedicalRecord,
        error,
        setError,
        isLoading,
    } = useDataItem<MedicalRecord>("/medicalRecords", id, {}, []);
    return { medicalRecord, setMedicalRecord, error, setError, isLoading };
};

export default useMedicalRecord;
