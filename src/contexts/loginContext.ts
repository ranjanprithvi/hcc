import { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { createContext } from "react";

interface ILoginContext {
    isLoggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    accessLevel: number;
    setAccessLevel: React.Dispatch<React.SetStateAction<number>>;
    props: WithAuthenticatorProps;
}
export const LoginContext = createContext<ILoginContext>({} as ILoginContext);
