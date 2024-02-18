import { Doctor } from "../models/doctor";
import useData from "./generic/useData";

const useDoctors = () => {
    const {
        data: doctors,
        setData: setDoctors,
        error,
        setError,
        isLoading,
    } = useData<Doctor>("/doctors", {}, []);
    return { doctors, setDoctors, error, setError, isLoading };
};

export default useDoctors;
