import { Profile, ProfileQuery } from "../models/profile";
import useData from "./generic/useData";

const useProfiles = (query?: ProfileQuery, deps?: any[]) => {
    const {
        data: profiles,
        setData: setProfiles,
        error,
        setError,
        isLoading,
    } = useData<Profile>("/profiles", query, deps);
    return { profiles, setProfiles, error, setError, isLoading };
};

export default useProfiles;
