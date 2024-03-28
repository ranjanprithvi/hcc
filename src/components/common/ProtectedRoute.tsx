import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { roles } from "../../App";
import { getAccessLevel } from "../../utilities/helper-service";
import { getCurrentUser } from "aws-amplify/auth";

interface Props {
    adminRoute?: JSX.Element;
    hospitalRoute?: JSX.Element;
    userRoute?: JSX.Element;
}

const ProtectedRoute = ({ adminRoute, hospitalRoute, userRoute }: Props) => {
    // const { isLoggedIn, accessLevel } = useContext(LoginContext);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(true);
    const accessLevel = getAccessLevel();

    useEffect(() => {
        getCurrentUser()
            .then(() => setLoggedIn(true))
            .catch(() => setLoggedIn(false));
    }, []);

    if (!isLoggedIn) return <Navigate to="/auth/login" replace />;

    switch (accessLevel) {
        case roles.admin:
            if (adminRoute) return adminRoute;
        case roles.hospital:
            if (hospitalRoute) return hospitalRoute;
        default:
            return userRoute || null;
    }
};

export default ProtectedRoute;
