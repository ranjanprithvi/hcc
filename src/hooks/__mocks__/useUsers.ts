import { usersArray } from "../../data/mockData";

const useUsers = jest.fn().mockReturnValue({
    users: usersArray,
    setUsers: jest.fn(),
    isLoading: false,
    error: "",
    setError: jest.fn(),
});

export default useUsers;
