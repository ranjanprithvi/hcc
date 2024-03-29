import { useState } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import Routes from "./Routes";
import { ProfileContext } from "./contexts/profileContext";

export const roles = {
    user: 1,
    hospital: 5,
    admin: 10,
};

export const doctorId = "65c8d613c5a2abf941ae6c57";

function App() {
    const [profileId, setProfileId] = useState<string>("");
    const [identityId, setIdentityId] = useState<string>("");

    const dataView = useBreakpointValue(
        {
            base: "accordion",
            md: "table",
        },
        {
            // Breakpoint to use when mediaqueries cannot be used, such as in server-side rendering
            // (Defaults to 'base')
            fallback: "md",
        }
    );

    // const {  } = useAuthenticator();

    return (
        <ProfileContext.Provider
            value={{
                profileId: profileId,
                identityId: identityId,
                setProfileId: setProfileId,
                setIdentityId: setIdentityId,
            }}
        >
            <Routes />
        </ProfileContext.Provider>
    );
}

export default App;
