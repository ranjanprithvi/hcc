import { Rental } from "../models/hospital";
import useData from "./generic/useData";

const useRentals = () => {
    const {
        data: rentals,
        setData: setRentals,
        error,
        setError,
        isLoading,
    } = useData<Rental>("/rentals");
    return { rentals, setRentals, error, setError, isLoading };
};

export default useRentals;
