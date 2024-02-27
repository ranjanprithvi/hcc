import { Prescription } from "../models/prescription";
import useDataItem from "./generic/useDataItem";

const usePrescription = (id: string) => {
    const {
        data: prescription,
        setData: setPrescription,
        error,
        setError,
        isLoading,
    } = useDataItem<Prescription>("/prescriptions", id, {}, []);
    return { prescription, setPrescription, error, setError, isLoading };
};

export default usePrescription;
