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

Amplify.configure(amplifyconfig);

const amplifyTheme = {
    name: "Custom",
    tokens: {
        components: {
            card: {
                backgroundColor: { value: "{colors.background.primary}" },
                outlined: {
                    borderColor: { value: "{colors.white}" },
                },
            },
            heading: {
                color: { value: "{colors.secondary[80]}" },
            },
            text: {
                color: { value: "{colors.primary[80]}" },
            },
        },
    },
    // primaryColor: "hsl(303.92857142857144, 100%, 67.05882352941177%)",
} as AmplifyTheme;
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
