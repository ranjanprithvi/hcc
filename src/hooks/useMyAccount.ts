import { Account } from "../models/account";
import useData from "./generic/useData";

const useAccount = () => {
    const {
        data: account,
        setData: setAccount,
        error,
        setError,
        isLoading,
    } = useData<Account>("/accounts/me", {}, []);
    return { account, setAccount, error, setError, isLoading };
};

export default useAccount;
