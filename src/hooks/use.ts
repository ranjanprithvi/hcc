import { Book, BookQuery } from "../models/book";
import useDataItem from "./generic/useDataItem";

const useBook = (id: string, query?: BookQuery, deps: any[] = []) => {
    const {
        data: book,
        setData: setBook,
        error,
        setError,
        isLoading,
    } = useDataItem<Book>("/books", id, query, deps);
    return { book, setBook, error, setError, isLoading };
};

export default useBook;
