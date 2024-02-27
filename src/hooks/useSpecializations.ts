import { Specialization } from "../models/specialization";
import useData from "./generic/useData";

const useSpecializations = () => {
    const {
        data: specializations,
        setData: setSpecializations,
        error,
        setError,
        isLoading,
    } = useData<Specialization>("/specializations", {}, []);
    return { specializations, setSpecializations, error, setError, isLoading };
};

export default useSpecializations;
