import { ReactNode, useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { LoginContext } from "../../contexts/loginContext";
import { roles } from "../../App";

interface Props {
    adminRoute?: JSX.Element;
    hospitalRoute?: JSX.Element;
    userRoute?: JSX.Element;
}

const ProtectedRoute = ({ adminRoute, hospitalRoute, userRoute }: Props) => {
    const { isLoggedIn, accessLevel } = useContext(LoginContext);

    if (!isLoggedIn) return <Navigate to="/login" replace />;

    switch (accessLevel) {
        case roles.admin:
            return adminRoute || null;
        case roles.hospital:
            return hospitalRoute || null;
        default:
            return userRoute || null;
    }
};

export default ProtectedRoute;
