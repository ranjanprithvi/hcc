import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../../contexts/loginContext";
import { roles } from "../../App";

interface Props {
    children: JSX.Element;
    nonAdminRedirect?: string;
}

const ProtectedAdminRoute = ({ children, nonAdminRedirect }: Props) => {
    const { isLoggedIn, accessLevel } = useContext(LoginContext);

    return isLoggedIn ? (
        accessLevel >= roles.admin ? (
            children
        ) : (
            <Navigate to={nonAdminRedirect || "/"} replace />
        )
    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedAdminRoute;
