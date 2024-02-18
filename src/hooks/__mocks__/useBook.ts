import { bookObj } from "../../data/mockData";

const useBook = jest
    .fn()
    .mockImplementation((id: string, query?: any, deps: any[] = []) => {
        return id == "new"
            ? {
                  book: {} as typeof bookObj,
                  setBook: jest.fn(),
                  isLoading: false,
                  error: "",
                  setError: jest.fn(),
              }
            : id == "noCover"
            ? {
                  book: { ...bookObj, coverImage: "" },
                  setBook: jest.fn(),
                  isLoading: false,
                  error: "",
                  setError: jest.fn(),
              }
            : id == "invalid"
            ? {
                  book: {} as typeof bookObj,
                  setBook: jest.fn(),
                  isLoading: false,
                  error: "Something went wrong",
                  setError: jest.fn(),
              }
            : {
                  book: bookObj,
                  setBook: jest.fn(),
                  isLoading: false,
                  error: "",
                  setError: jest.fn(),
              };
    });

export default useBook;
