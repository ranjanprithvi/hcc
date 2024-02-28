import { Account } from "../models/account";
import useData from "./generic/useData";

const useAccounts = () => {
    const {
        data: accounts,
        setData: setAccounts,
        error,
        setError,
        isLoading,
    } = useData<Account>("/accounts", {}, []);
    return { accounts, setAccounts, error, setError, isLoading };
};

export default useAccounts;
