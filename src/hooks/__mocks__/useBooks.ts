import { booksArray } from "../../data/mockData";

const useBooks = jest.fn().mockReturnValue({
    books: booksArray,
    setBooks: jest.fn(),
    isLoading: false,
    error: "",
    setError: jest.fn(),
});

export default useBooks;
