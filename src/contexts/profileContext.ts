import { Profile } from "./../models/profile";
import { createContext } from "react";

interface IProfileContext {
    profileId: string;
    identityId: string;
    setProfileId: React.Dispatch<React.SetStateAction<string>>;
    setIdentityId: React.Dispatch<React.SetStateAction<string>>;
}

export const ProfileContext = createContext<IProfileContext>(
    {} as IProfileContext
);
