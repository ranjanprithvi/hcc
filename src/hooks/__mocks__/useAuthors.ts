const useAuthors = jest.fn().mockReturnValue({
    authors: [
        { _id: "1", name: "author1" },
        { _id: "2", name: "author2" },
    ],
    setAuthors: jest.fn(),
    error: "",
    setError: jest.fn(),
    isLoading: false,
});

export default useAuthors;
