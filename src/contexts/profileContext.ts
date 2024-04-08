import { Profile } from "./../models/profile";
import { createContext } from "react";

interface IAccountContext {
    // profileId: string;
    identityId: string;
    // setProfileId: React.Dispatch<React.SetStateAction<string>>;
    setIdentityId: React.Dispatch<React.SetStateAction<string>>;
}

export const AccountContext = createContext<IAccountContext>(
    {} as IAccountContext
);
