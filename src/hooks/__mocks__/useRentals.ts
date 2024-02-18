import { rentalsArray } from "../../data/mockData";

const useRentals = jest.fn().mockReturnValue({
    rentals: rentalsArray,
    setRentals: jest.fn(),
    isLoading: false,
    error: "",
    setError: jest.fn(),
});

export default useRentals;
