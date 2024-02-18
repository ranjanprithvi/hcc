import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../../contexts/loginContext";
import { roles } from "../../App";

interface Props {
    children: JSX.Element;
    nonHospitalRedirect?: string;
}

const ProtectedHospitalComponent = ({
    children,
    nonHospitalRedirect,
}: Props) => {
    const { isLoggedIn, accessLevel } = useContext(LoginContext);

    return isLoggedIn ? (
        accessLevel >= roles.hospital ? (
            children
        ) : (
            <Navigate to={nonHospitalRedirect || "/"} replace />
        )
    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedHospitalComponent;
