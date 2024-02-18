import { Book, BookQuery } from "../models/book";
import useData from "./generic/useData";

const useBooks = (query?: BookQuery, deps?: any[]) => {
    const {
        data: books,
        setData: setBooks,
        error,
        setError,
        isLoading,
    } = useData<Book>("/books", query, deps);
    return { books, setBooks, error, setError, isLoading };
};

export default useBooks;
