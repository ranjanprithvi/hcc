import "./App.css";
import { useState } from "react";
import { LoginContext } from "./contexts/loginContext";
import { useBreakpointValue } from "@chakra-ui/react";
import Routes from "./Routes";
import { ColourPaletteContext } from "./contexts/colourPaletteContext";
import { getAccessLevel, getToken } from "./services/helper-service";

export const roles = {
    user: 1,
    hospital: 5,
    admin: 10,
};

export const doctorId = "65c8d613c5a2abf941ae6c57";

function App() {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(getToken() !== null);
    const [accessLevel, setAccessLevel] = useState(getAccessLevel());

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

    return (
        <ColourPaletteContext.Provider
            value={{
                primaryColour: "#ff4196",
                secondaryColour: "#f19b1a",
                secondaryBgColour: "#fef4ea",
            }}
        >
            <LoginContext.Provider
                value={{
                    isLoggedIn,
                    setLoggedIn: setLoggedIn,
                    accessLevel,
                    setAccessLevel,
                }}
            >
                <Routes />
            </LoginContext.Provider>
        </ColourPaletteContext.Provider>
    );
}

export default App;
