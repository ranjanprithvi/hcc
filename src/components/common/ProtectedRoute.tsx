import { ReactNode, useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { LoginContext } from "../../contexts/loginContext";
import { roles } from "../../App";

interface Props {
    admin?: JSX.Element;
    hospital?: JSX.Element;
    user?: JSX.Element;
}

const ProtectedRoute = ({ admin, hospital, user }: Props) => {
    const { isLoggedIn, accessLevel } = useContext(LoginContext);

    if (!isLoggedIn) return <Navigate to="/login" replace />;

    switch (accessLevel) {
        case roles.admin:
            if (admin) return admin;
        case roles.hospital:
            if (hospital) return hospital;
        default:
            return user || null;
    }
};

export default ProtectedRoute;
