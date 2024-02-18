import { userObj } from "../../data/mockData";

const useUser = jest
    .fn()
    .mockImplementation((id: string, query?: any, deps: any[] = []) => {
        return id == "new"
            ? {
                  user: {} as typeof userObj,
                  setUser: jest.fn(),
                  isLoading: false,
                  error: "",
                  setError: jest.fn(),
              }
            : id == "noCover"
            ? {
                  user: { ...userObj, coverImage: "" },
                  setUser: jest.fn(),
                  isLoading: false,
                  error: "",
                  setError: jest.fn(),
              }
            : id == "invalid"
            ? {
                  user: {} as typeof userObj,
                  setUser: jest.fn(),
                  isLoading: false,
                  error: "Something went wrong",
                  setError: jest.fn(),
              }
            : {
                  user: userObj,
                  setUser: jest.fn(),
                  isLoading: false,
                  error: "",
                  setError: jest.fn(),
              };
    });

export default useUser;
