import { ReactNode, useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { LoginContext } from "../../contexts/loginContext";
import { roles } from "../../App";

interface Props {
    adminComponent?: JSX.Element;
    hospitalComponent?: JSX.Element;
    userComponent?: JSX.Element;
    defaultComponent?: JSX.Element;
}

const ProtectedComponent = ({
    adminComponent,
    hospitalComponent,
    userComponent,
    defaultComponent,
}: Props) => {
    const { isLoggedIn, accessLevel } = useContext(LoginContext);

    if (!isLoggedIn) return defaultComponent || null;

    switch (accessLevel) {
        case roles.admin:
            return adminComponent || null;
        case roles.hospital:
            return hospitalComponent || null;
        default:
            return userComponent || null;
    }
};

export default ProtectedComponent;
