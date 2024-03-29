import { Account } from "../models/account";
import { Appointment } from "../models/appointment";
import { Profile } from "../models/profile";
import useDataItem from "./generic/useDataItem";

const useProfile = (id: string) => {
    const {
        data: profile,
        setData: setProfile,
        error,
        setError,
        isLoading,
    } = useDataItem<Profile>("/profiles/overview", id, {}, []);

    return {
        identityId: (profile?.account as Account)?.identityId || "",
        appointments: profile.appointments || [],
        medicalRecords: profile.medicalRecords || [],
        externalRecords: profile.externalRecords || [],
        prescriptions: profile.prescriptions || [],
        externalPrescriptions: profile.externalPrescriptions || [],
        error,
        isLoading,
    };
};

export default useProfile;
