import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import App from "./App";
import "./normalise.css";
import "./loader.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./amplifyconfiguration.json";
import {
    Authenticator as AmplifyAuthenticator,
    ThemeProvider as AmplifyThemeProvider,
    Theme as AmplifyTheme,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { signOut } from "aws-amplify/auth";
import colourPalette from "./utilities/colour-palette";
import "./amplify";

Amplify.configure(amplifyconfig, {
    Storage: {
        S3: {
            prefixResolver: async ({ accessLevel, targetIdentityId }) => {
                if (accessLevel === "guest") {
                    return "public/";
                } else if (accessLevel === "protected") {
                    return `protected/`;
                } else {
                    return `private/`;
                }
            },
        },
    },
});

const router = createBrowserRouter([
    {
        path: "*",
        element: (
            <AmplifyAuthenticator.Provider
            // socialProviders={["google"]}
            // variation="modal"
            // // hideSignUp={true}
            // signUpAttributes={{ autoSignIn: true }}
            >
                <App />
            </AmplifyAuthenticator.Provider>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
);
