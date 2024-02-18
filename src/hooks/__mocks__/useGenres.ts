import { genresArray } from "../../data/mockData";

const useGenres = jest.fn().mockReturnValue({
    genres: genresArray,
    setGenres: jest.fn(),
    error: "",
    setError: jest.fn(),
    isLoading: false,
});

export default useGenres;
