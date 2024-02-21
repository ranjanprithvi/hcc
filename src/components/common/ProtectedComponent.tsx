import { ReactNode, useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { LoginContext } from "../../contexts/loginContext";
import { roles } from "../../App";

interface Props {
    admin?: JSX.Element;
    hospital?: JSX.Element;
    user?: JSX.Element;
    defaultComponent?: JSX.Element;
}

const ProtectedComponent = ({
    admin,
    hospital,
    user,
    defaultComponent,
}: Props) => {
    const { isLoggedIn, accessLevel } = useContext(LoginContext);

    if (!isLoggedIn) return defaultComponent || null;

    switch (accessLevel) {
        case roles.admin:
            if (admin) return admin;

        case roles.hospital:
            if (hospital) return hospital;

        default:
            return user || null;
    }
};

export default ProtectedComponent;
