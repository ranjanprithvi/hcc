import { Profile, ProfileQuery } from "../models/profile";
import useDataItem from "./generic/useDataItem";

const useProfile = (id: string, query: ProfileQuery = {}, deps: any[] = []) => {
    const {
        data: profile,
        setData: setProfile,
        error,
        setError,
        isLoading,
    } = useDataItem<Profile>("/profiles", id, query, deps || []);
    return { profile, setProfile, error, setError, isLoading };
};

export default useProfile;
